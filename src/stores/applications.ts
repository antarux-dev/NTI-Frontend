import { defineStore } from 'pinia';
import { ref } from 'vue';
import ApplicationService, {
  type Application,
  type ApplicationDetail,
  type CreateApplicationPayload,
} from '@/services/applications.service';

export const useApplicationStore = defineStore('applications', () => {
  const applications = ref<Application[]>([]);
  const current = ref<ApplicationDetail | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const totalPages = ref(1);

  async function fetchApplications(page = 1): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      const result = await ApplicationService.list({ page });
      applications.value = result.data;
      totalPages.value = result.meta.lastPage;
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Nepodarilo sa načítať prihlášky.';
    } finally {
      loading.value = false;
    }
  }

  async function fetchApplication(id: number): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      current.value = await ApplicationService.get(id);
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Nepodarilo sa načítať prihlášku.';
    } finally {
      loading.value = false;
    }
  }

  async function createApplication(payload: CreateApplicationPayload): Promise<Application> {
    loading.value = true;
    error.value = null;
    try {
      const created = await ApplicationService.create(payload);
      applications.value.unshift(created);
      return created;
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Nepodarilo sa vytvoriť prihlášku.';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function submitApplication(id: number): Promise<void> {
    const updated = await ApplicationService.submit(id);
    const idx = applications.value.findIndex((a) => a.id === id);
    if (idx !== -1) applications.value[idx] = updated;
    if (current.value?.id === id) current.value = { ...current.value, ...updated };
  }

  function clearCurrent(): void {
    current.value = null;
  }

  return {
    applications,
    current,
    loading,
    error,
    totalPages,
    fetchApplications,
    fetchApplication,
    createApplication,
    submitApplication,
    clearCurrent,
  };
});
