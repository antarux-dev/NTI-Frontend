<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { Briefcase, Plus, ChevronRight, Clock, Users } from 'lucide-vue-next';
  import NtiEmptyState from '@/components/ui/NtiEmptyState.vue';
  import NtiStatusBadge from '@/components/ui/NtiStatusBadge.vue';

  // Placeholder — replace with API call when backend is ready
  const projects = ref<
    {
      id: number;
      title: string;
      status: string;
      teamName?: string;
      deadline?: string;
      applicants: number;
    }[]
  >([]);

  function formatDate(d: string): string {
    return new Intl.DateTimeFormat('sk-SK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(d));
  }
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <p class="font-mono text-xs text-nti-green mb-1">// Projekty</p>
        <h1 class="font-display text-xl font-bold text-nti-white">Moje projekty</h1>
      </div>
      <RouterLink :to="{ name: 'company-new-project' }" class="btn-primary text-sm">
        <Plus class="size-4" /> Nové zadanie
      </RouterLink>
    </div>

    <!-- Empty -->
    <div v-if="projects.length === 0">
      <NtiEmptyState
        :icon="Briefcase"
        title="Žiadne projekty"
        description="Zadajte technickú špecifikáciu a NTI vám nájde vhodný študentský tím."
      >
        <template #actions>
          <RouterLink :to="{ name: 'company-new-project' }" class="btn-primary text-sm">
            <Plus class="size-4" /> Pridať projekt
          </RouterLink>
        </template>
      </NtiEmptyState>
    </div>

    <!-- List -->
    <div v-else class="space-y-4">
      <RouterLink
        v-for="p in projects"
        :key="p.id"
        :to="{ name: 'company-project-detail', params: { id: p.id } }"
        class="card-nti group flex items-center justify-between p-5 block"
      >
        <div class="flex items-center gap-4 min-w-0 flex-1">
          <div
            class="size-10 rounded-xl bg-nti-surface border border-nti-border flex items-center justify-center shrink-0"
          >
            <Briefcase class="size-5 text-nti-gray" />
          </div>
          <div class="min-w-0">
            <p
              class="text-sm font-semibold text-nti-white truncate group-hover:text-nti-green transition-colors mb-1"
            >
              {{ p.title }}
            </p>
            <div class="flex items-center gap-3 text-xs text-nti-muted">
              <span v-if="p.teamName" class="flex items-center gap-1">
                <Users class="size-3" /> {{ p.teamName }}
              </span>
              <span v-if="p.deadline" class="flex items-center gap-1">
                <Clock class="size-3" /> {{ formatDate(p.deadline) }}
              </span>
              <span v-if="p.applicants > 0"> {{ p.applicants }} prihlášok </span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3 shrink-0 ml-4">
          <NtiStatusBadge :status="p.status" />
          <ChevronRight
            class="size-4 text-nti-muted group-hover:text-nti-green transition-colors"
          />
        </div>
      </RouterLink>
    </div>
  </div>
</template>
