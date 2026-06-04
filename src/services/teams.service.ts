import apiClient from '../utils/http';
import type { ApiResponse } from '../types';

export interface Team {
  id: number;
  name: string;
  leaderId: number;
  members: TeamMember[];
  skills: string[];
  createdAt: string;
}

export interface TeamMember {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'leader' | 'member';
}

export interface CreateTeamPayload {
  name: string;
  skills?: string[];
}

export interface InviteTeamMemberPayload {
  email: string;
}

const TeamService = {
  async getMyTeam(): Promise<Team | null> {
    try {
      const { data } = await apiClient.get<ApiResponse<Team>>('/teams/my');
      return data.data;
    } catch {
      return null;
    }
  },

  async create(payload: CreateTeamPayload): Promise<Team> {
    const { data } = await apiClient.post<ApiResponse<Team>>('/teams', payload);
    return data.data;
  },

  async update(id: number, payload: Partial<CreateTeamPayload>): Promise<Team> {
    const { data } = await apiClient.patch<ApiResponse<Team>>(`/teams/${id}`, payload);
    return data.data;
  },

  async invite(teamId: number, payload: InviteTeamMemberPayload): Promise<void> {
    await apiClient.post(`/teams/${teamId}/invite`, payload);
  },

  async removeMember(teamId: number, userId: number): Promise<void> {
    await apiClient.delete(`/teams/${teamId}/members/${userId}`);
  },

  async leaveTeam(teamId: number): Promise<void> {
    await apiClient.post(`/teams/${teamId}/leave`);
  },
};

export default TeamService;
