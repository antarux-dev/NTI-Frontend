import apiClient from '@/utils/http';
import type { ApiResponse, PaginatedResponse, Program, Call } from '@/types';

const ProgramService = {
  async getPrograms(): Promise<Program[]> {
    const { data } = await apiClient.get<ApiResponse<Program[]>>('/programs');
    return data.data;
  },

  async getProgram(id: number): Promise<Program> {
    const { data } = await apiClient.get<ApiResponse<Program>>(`/programs/${id}`);
    return data.data;
  },

  async getCalls(params?: {
    programId?: number;
    status?: string;
    page?: number;
  }): Promise<PaginatedResponse<Call>> {
    const { data } = await apiClient.get<PaginatedResponse<Call>>('/calls', { params });
    return data;
  },

  async getCall(id: number): Promise<Call> {
    const { data } = await apiClient.get<ApiResponse<Call>>(`/calls/${id}`);
    return data.data;
  },
};

export default ProgramService;
