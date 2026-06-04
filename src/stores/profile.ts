import { defineStore } from 'pinia';
import { ref } from 'vue';
import ProfileService, {
  type UpdateStudentProfilePayload,
  type UpdateCompanyProfilePayload,
} from '@/services/profile.service';
import type { StudentProfile, CompanyProfile } from '../types';

export const useProfileStore = defineStore('profile', () => {
  const studentProfile = ref<StudentProfile | null>(null);
  const companyProfile = ref<CompanyProfile | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const successMessage = ref<string | null>(null);

  async function fetchStudentProfile(): Promise<void> {
    loading.value = true;
    try {
      studentProfile.value = await ProfileService.getStudentProfile();
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Nepodarilo sa načítať profil.';
    } finally {
      loading.value = false;
    }
  }

  async function updateStudentProfile(payload: UpdateStudentProfilePayload): Promise<void> {
    loading.value = true;
    error.value = null;
    successMessage.value = null;
    try {
      studentProfile.value = await ProfileService.updateStudentProfile(payload);
      successMessage.value = 'Profil bol úspešne aktualizovaný.';
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Nepodarilo sa uložiť profil.';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function uploadCV(file: File): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      const { url } = await ProfileService.uploadCV(file);
      if (studentProfile.value) {
        studentProfile.value = { ...studentProfile.value, cvUrl: url };
      }
      successMessage.value = 'CV bolo úspešne nahraté.';
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Nahrávanie zlyhalo.';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function fetchCompanyProfile(): Promise<void> {
    loading.value = true;
    try {
      companyProfile.value = await ProfileService.getCompanyProfile();
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Nepodarilo sa načítať profil firmy.';
    } finally {
      loading.value = false;
    }
  }

  async function updateCompanyProfile(payload: UpdateCompanyProfilePayload): Promise<void> {
    loading.value = true;
    error.value = null;
    successMessage.value = null;
    try {
      companyProfile.value = await ProfileService.updateCompanyProfile(payload);
      successMessage.value = 'Profil firmy bol úspešne aktualizovaný.';
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Nepodarilo sa uložiť profil firmy.';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function clearMessages(): void {
    error.value = null;
    successMessage.value = null;
  }

  return {
    studentProfile,
    companyProfile,
    loading,
    error,
    successMessage,
    fetchStudentProfile,
    updateStudentProfile,
    uploadCV,
    fetchCompanyProfile,
    updateCompanyProfile,
    clearMessages,
  };
});
