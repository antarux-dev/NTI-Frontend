import apiClient from '../utils/http';
import type {
  User,
  LoginPayload,
  RegisterStudentPayload,
  RegisterCompanyPayload,
  RegisterMemberPayload,
  ApiResponse,
} from '../types';

export interface AuthTokenResponse {
  token: string;
  user: User;
}

const AuthService = {
  async login(payload: LoginPayload): Promise<AuthTokenResponse> {
    const { data } = await apiClient.post<AuthTokenResponse>('/auth/login', payload);
    return data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async me(): Promise<User> {
    const { data } = await apiClient.get<ApiResponse<User>>('/auth/me');
    return data.data;
  },

  async registerStudent(payload: RegisterStudentPayload): Promise<void> {
    await apiClient.post('/auth/register/student', payload);
  },

  async registerCompany(payload: RegisterCompanyPayload): Promise<void> {
    await apiClient.post('/auth/register/company', payload);
  },

  async registerMember(payload: RegisterMemberPayload): Promise<void> {
    await apiClient.post('/auth/register/member', payload);
  },

  async requestPasswordReset(email: string): Promise<void> {
    await apiClient.post('/auth/password/forgot', { email });
  },

  async resetPassword(
    token: string,
    password: string,
    passwordConfirmation: string
  ): Promise<void> {
    await apiClient.post('/auth/password/reset', {
      token,
      password,
      password_confirmation: passwordConfirmation,
    });
  },

  async verifyEmail(id: string, hash: string): Promise<void> {
    await apiClient.get(`/auth/email/verify/${id}/${hash}`);
  },
};

export default AuthService;
