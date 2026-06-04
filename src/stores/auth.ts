import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import apiClient from '../utils/http';
import type {
  User,
  LoginPayload,
  RegisterStudentPayload,
  RegisterCompanyPayload,
  RegisterMemberPayload,
} from '../types';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('nti_token'));
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => token.value !== null && user.value !== null);
  const isStudent = computed(() => user.value?.accountType === 'student');
  const isCompany = computed(() => user.value?.accountType === 'company');
  const isAdmin = computed(() => user.value?.accountType === 'admin');

  function setToken(newToken: string): void {
    token.value = newToken;
    localStorage.setItem('nti_token', newToken);
  }

  function clearAuth(): void {
    user.value = null;
    token.value = null;
    localStorage.removeItem('nti_token');
  }

  async function login(payload: LoginPayload): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await apiClient.post<{ token: string; user: User }>(
        '/auth/login',
        payload,
      );
      setToken(data.token);
      user.value = data.user;
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Prihlásenie zlyhalo. Skúste to znova.';
      error.value = msg;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function registerStudent(payload: RegisterStudentPayload): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      await apiClient.post('/auth/register/student', payload);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Registrácia zlyhala. Skúste to znova.';
      error.value = msg;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function registerCompany(payload: RegisterCompanyPayload): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      await apiClient.post('/auth/register/company', payload);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Registrácia zlyhala. Skúste to znova.';
      error.value = msg;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function registerMember(payload: RegisterMemberPayload): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      await apiClient.post('/auth/register/member', payload);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Registrácia zlyhala. Skúste to znova.';
      error.value = msg;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function fetchMe(): Promise<void> {
    if (!token.value) return;
    try {
      const { data } = await apiClient.get<{ data: User }>('/auth/me');
      user.value = data.data;
    } catch {
      clearAuth();
    }
  }

  async function logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      clearAuth();
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isStudent,
    isCompany,
    isAdmin,
    login,
    registerStudent,
    registerCompany,
    registerMember,
    fetchMe,
    logout,
    clearAuth,
  };
});