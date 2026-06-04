<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { RouterLink } from 'vue-router';
  import { FileText, ArrowRight, Loader2, Plus } from 'lucide-vue-next';
  import { useApplicationStore } from '@/stores/applications';
  import { usePagination } from '@/composables/usePagination';
  import NtiStatusBadge from '@/components/ui/NtiStatusBadge.vue';
  import NtiEmptyState from '@/components/ui/NtiEmptyState.vue';
  import type { ApplicationStatus } from '@/types';

  const appStore = useApplicationStore();
  const pagination = usePagination();

  const statusFilter = ref<ApplicationStatus | ''>('');

  const statusOptions: { value: ApplicationStatus | ''; label: string }[] = [
    { value: '', label: 'Všetky' },
    { value: 'draft', label: 'Rozpracované' },
    { value: 'submitted', label: 'Odoslané' },
    { value: 'under_review', label: 'V hodnotení' },
    { value: 'revision_requested', label: 'Doplnenie' },
    { value: 'approved', label: 'Schválené' },
    { value: 'rejected', label: 'Zamietnuté' },
    { value: 'active', label: 'Aktívne' },
    { value: 'completed', label: 'Ukončené' },
  ];

  async function load(): Promise<void> {
    await appStore.fetchApplications(pagination.currentPage.value);
  }

  onMounted(load);
  watch([pagination.currentPage, statusFilter], load);

  function formatDate(dateStr: string): string {
    return new Intl.DateTimeFormat('sk-SK', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateStr));
  }
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <p class="font-mono text-xs text-nti-green mb-1">// Prihlášky</p>
        <h1 class="font-display text-xl font-bold text-nti-white">Moje prihlášky</h1>
      </div>
      <RouterLink :to="{ name: 'challenges' }" class="btn-primary text-sm">
        <Plus class="size-4" />
        Nová prihláška
      </RouterLink>
    </div>

    <!-- Status filter tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="opt in statusOptions"
        :key="opt.value"
        class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
        :class="
          statusFilter === opt.value
            ? 'bg-nti-green text-nti-black'
            : 'bg-nti-surface border border-nti-border text-nti-gray hover:text-nti-white'
        "
        @click="statusFilter = opt.value"
      >
        {{ opt.label }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="appStore.loading" class="flex justify-center py-16">
      <Loader2 class="size-7 text-nti-green animate-spin" />
    </div>

    <!-- Empty state -->
    <div v-else-if="appStore.applications.length === 0">
      <NtiEmptyState
        :icon="FileText"
        title="Žiadne prihlášky"
        description="Ešte ste nepodali žiadnu prihlášku. Pozrite si aktívne výzvy a prihláste sa."
      >
        <template #actions>
          <RouterLink :to="{ name: 'challenges' }" class="btn-primary text-sm">
            Pozrieť výzvy
            <ArrowRight class="size-3.5" />
          </RouterLink>
        </template>
      </NtiEmptyState>
    </div>

    <!-- List -->
    <div v-else class="space-y-3">
      <RouterLink
        v-for="app in appStore.applications"
        :key="app.id"
        :to="{ name: 'student-application-detail', params: { id: app.id } }"
        class="card-nti group flex items-center justify-between p-5 block"
      >
        <div class="flex items-center gap-4 min-w-0 flex-1">
          <div
            class="size-10 rounded-xl bg-nti-surface border border-nti-border flex items-center justify-center shrink-0"
          >
            <FileText class="size-5 text-nti-gray" />
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-3 mb-0.5">
              <p
                class="text-sm font-semibold text-nti-white truncate group-hover:text-nti-green transition-colors"
              >
                {{ app.callTitle }}
              </p>
              <span class="font-mono text-xs text-nti-muted shrink-0">
                Program {{ app.programType }}
              </span>
            </div>
            <p class="text-xs text-nti-muted">Posledná zmena: {{ formatDate(app.updatedAt) }}</p>
          </div>
        </div>
        <div class="flex items-center gap-3 shrink-0 ml-4">
          <NtiStatusBadge :status="app.status" />
          <ArrowRight class="size-4 text-nti-muted group-hover:text-nti-green transition-colors" />
        </div>
      </RouterLink>
    </div>

    <!-- Pagination -->
    <div v-if="pagination.lastPage.value > 1" class="flex items-center justify-center gap-2 mt-8">
      <button
        class="btn-outline text-sm px-3 py-1.5"
        :disabled="!pagination.hasPrevPage.value"
        @click="pagination.prevPage()"
      >
        ← Predchádzajúca
      </button>
      <span class="text-sm text-nti-gray">
        {{ pagination.currentPage.value }} / {{ pagination.lastPage.value }}
      </span>
      <button
        class="btn-outline text-sm px-3 py-1.5"
        :disabled="!pagination.hasNextPage.value"
        @click="pagination.nextPage()"
      >
        Ďalšia →
      </button>
    </div>
  </div>
</template>
