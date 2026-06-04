import apiClient from '../utils/http';
import type {
  ApiResponse,
  PaginatedResponse,
  ApplicationStatus,
} from '../types';

export interface Application {
  id: number;
  callId: number;
  callTitle: string;
  programType: 'A' | 'B';
  status: ApplicationStatus;
  submittedAt?: string;
  updatedAt: string;
  teamId?: number;
  teamName?: string;
}

export interface ApplicationDetail extends Application {
  motivationLetter?: string;
  documents: ApplicationDocument[];
  timeline: ApplicationEvent[];
  score?: number;
  feedback?: string;
}

export interface ApplicationDocument {
  id: number;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface ApplicationEvent {
  id: number;
  status: ApplicationStatus;
  note?: string;
  createdAt: string;
  actor: string;
}

export interface CreateApplicationPayload {
  callId: number;
  teamId?: number;
  motivationLetter: string;
}

const ApplicationService = {
  async list(params?: { status?: ApplicationStatus; page?: number }): Promise<PaginatedResponse<Application>> {
    const { data } = await apiClient.get<PaginatedResponse<Application>>('/applications', { params });
    return data;
  },

  async get(id: number): Promise<ApplicationDetail> {
    const { data } = await apiClient.get<ApiResponse<ApplicationDetail>>(`/applications/${id}`);
    return data.data;
  },

  async create(payload: CreateApplicationPayload): Promise<Application> {
    const { data } = await apiClient.post<ApiResponse<Application>>('/applications', payload);
    return data.data;
  },

  async submit(id: number): Promise<Application> {
    const { data } = await apiClient.post<ApiResponse<Application>>(`/applications/${id}/submit`);
    return data.data;
  },

  async saveDraft(id: number, payload: Partial<CreateApplicationPayload>): Promise<Application> {
    const { data } = await apiClient.patch<ApiResponse<Application>>(
      `/applications/${id}`,
      payload,
    );
    return data.data;
  },

  async uploadDocument(id: number, file: File, type: string): Promise<ApplicationDocument> {
    const form = new FormData();
    form.append('file', file);
    form.append('type', type);
    const { data } = await apiClient.post<ApiResponse<ApplicationDocument>>(
      `/applications/${id}/documents`,
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return data.data;
  },
};

export default ApplicationService;