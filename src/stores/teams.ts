import { defineStore } from 'pinia';
import { ref } from 'vue';
import TeamService, { type Team, type CreateTeamPayload } from '@/services/teams.service';

export const useTeamStore = defineStore('teams', () => {
  const team = ref<Team | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const successMessage = ref<string | null>(null);

  async function fetchMyTeam(): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      team.value = await TeamService.getMyTeam();
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Nepodarilo sa načítať tím.';
    } finally {
      loading.value = false;
    }
  }

  async function createTeam(payload: CreateTeamPayload): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      team.value = await TeamService.create(payload);
      successMessage.value = 'Tím bol úspešne vytvorený.';
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Nepodarilo sa vytvoriť tím.';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function inviteMember(email: string): Promise<void> {
    if (!team.value) return;
    loading.value = true;
    error.value = null;
    try {
      await TeamService.invite(team.value.id, { email });
      successMessage.value = `Pozvánka odoslaná na ${email}.`;
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Nepodarilo sa odoslať pozvánku.';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function removeMember(userId: number): Promise<void> {
    if (!team.value) return;
    await TeamService.removeMember(team.value.id, userId);
    if (team.value) {
      team.value = {
        ...team.value,
        members: team.value.members.filter((m) => m.userId !== userId),
      };
    }
  }

  async function leaveTeam(): Promise<void> {
    if (!team.value) return;
    await TeamService.leaveTeam(team.value.id);
    team.value = null;
  }

  function clearMessages(): void {
    error.value = null;
    successMessage.value = null;
  }

  return {
    team,
    loading,
    error,
    successMessage,
    fetchMyTeam,
    createTeam,
    inviteMember,
    removeMember,
    leaveTeam,
    clearMessages,
  };
});
