import apiClient from '../utils/http';
import type { ApiResponse, StudentProfile, CompanyProfile } from '../types';

export interface UpdateStudentProfilePayload {
  firstName?: string;
  lastName?: string;
  studyProgram?: string;
  yearOfStudy?: number;
  skills?: string[];
}

export interface UpdateCompanyProfilePayload {
  name?: string;
  sector?: string;
  description?: string;
  contactPhone?: string;
  website?: string;
}

const ProfileService = {
  async getStudentProfile(): Promise<StudentProfile> {
    const { data } = await apiClient.get<ApiResponse<StudentProfile>>('/profile/student');
    return data.data;
  },

  async updateStudentProfile(payload: UpdateStudentProfilePayload): Promise<StudentProfile> {
    const { data } = await apiClient.patch<ApiResponse<StudentProfile>>(
      '/profile/student',
      payload,
    );
    return data.data;
  },

  async uploadCV(file: File): Promise<{ url: string }> {
    const form = new FormData();
    form.append('cv', file);
    const { data } = await apiClient.post<ApiResponse<{ url: string }>>(
      '/profile/student/cv',
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return data.data;
  },

  async getCompanyProfile(): Promise<CompanyProfile> {
    const { data } = await apiClient.get<ApiResponse<CompanyProfile>>('/profile/company');
    return data.data;
  },

  async updateCompanyProfile(payload: UpdateCompanyProfilePayload): Promise<CompanyProfile> {
    const { data } = await apiClient.patch<ApiResponse<CompanyProfile>>(
      '/profile/company',
      payload,
    );
    return data.data;
  },
};

export default ProfileService;