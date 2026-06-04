<script setup lang="ts">
  import { onMounted, computed } from 'vue';
  import { RouterLink } from 'vue-router';
  import {
    FileText,
    Users,
    Clock,
    ArrowRight,
    Rocket,
    ChevronRight,
    Loader2,
  } from 'lucide-vue-next';
  import { useAuthStore } from '@/stores/auth';
  import { useApplicationStore } from '@/stores/applications';
  import NtiStatusBadge from '@/components/ui/NtiStatusBadge.vue';
  import NtiEmptyState from '@/components/ui/NtiEmptyState.vue';

  const authStore = useAuthStore();
  const appStore = useApplicationStore();

  onMounted(() => {
    void appStore.fetchApplications();
  });

  const recentApplications = computed(() => appStore.applications.slice(0, 5));

  const stats = computed(() => [
    {
      label: 'Prihlášky',
      value: appStore.applications.length,
      icon: FileText,
      color: 'text-nti-green',
    },
    {
      label: 'Aktívne',
      value: appStore.applications.filter((a) => a.status === 'active').length,
      icon: Rocket,
      color: 'text-nti-green',
    },
    {
      label: 'V hodnotení',
      value: appStore.applications.filter((a) => a.status === 'under_review').length,
      icon: Clock,
      color: 'text-blue-400',
    },
    { label: 'Tím', value: 0, icon: Users, color: 'text-nti-gray' },
  ]);

  const quickActions = [
    {
      label: 'Podať prihlášku',
      desc: 'Zobraziť aktívne výzvy',
      to: { name: 'challenges' },
      icon: Rocket,
    },
    {
      label: 'Môj tím',
      desc: 'Spravovať tím a členov',
      to: { name: 'student-team' },
      icon: Users,
    },
    {
      label: 'Môj profil',
      desc: 'Upraviť profil a CV',
      to: { name: 'student-profile' },
      icon: FileText,
    },
  ];

  function formatDate(dateStr: string): string {
    return new Intl.DateTimeFormat('sk-SK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateStr));
  }
</script>

<template>
  <div>
    <!-- Greeting -->
    <div class="mb-8">
      <p class="font-mono text-xs text-nti-green mb-1">// Dashboard</p>
      <h1 class="font-display text-2xl font-bold text-nti-white mb-1">
        Vitaj, {{ authStore.user?.firstName }}!
      </h1>
      <p class="text-sm text-nti-gray">Prehľad tvojich aktivít v NTI portáli.</p>
    </div>

    <!-- Stats row -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div v-for="stat in stats" :key="stat.label" class="card-nti p-5">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs text-nti-gray font-mono">{{ stat.label }}</span>
          <component :is="stat.icon" class="size-4" :class="stat.color" />
        </div>
        <span class="font-display text-3xl font-bold text-nti-white">{{ stat.value }}</span>
      </div>
    </div>

    <!-- Main grid -->
    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Applications list -->
      <div class="lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-display text-base font-semibold text-nti-white">Moje prihlášky</h2>
          <RouterLink
            :to="{ name: 'student-applications' }"
            class="text-xs text-nti-green hover:text-nti-green-light flex items-center gap-1"
          >
            Všetky <ChevronRight class="size-3" />
          </RouterLink>
        </div>

        <div v-if="appStore.loading" class="flex justify-center py-10">
          <Loader2 class="size-6 text-nti-green animate-spin" />
        </div>

        <div v-else-if="recentApplications.length === 0">
          <NtiEmptyState
            :icon="FileText"
            title="Žiadne prihlášky"
            description="Ešte ste nepodali žiadnu prihlášku do programu."
          >
            <template #actions>
              <RouterLink :to="{ name: 'challenges' }" class="btn-primary text-sm">
                Pozrieť výzvy
                <ArrowRight class="size-3.5" />
              </RouterLink>
            </template>
          </NtiEmptyState>
        </div>

        <div v-else class="space-y-3">
          <RouterLink
            v-for="app in recentApplications"
            :key="app.id"
            :to="{ name: 'student-application-detail', params: { id: app.id } }"
            class="card-nti group flex items-center justify-between p-4 block"
          >
            <div class="flex items-center gap-4 min-w-0">
              <div
                class="size-9 rounded-lg bg-nti-surface border border-nti-border flex items-center justify-center shrink-0"
              >
                <FileText class="size-4 text-nti-gray" />
              </div>
              <div class="min-w-0">
                <p
                  class="text-sm font-medium text-nti-white truncate group-hover:text-nti-green transition-colors"
                >
                  {{ app.callTitle }}
                </p>
                <p class="text-xs text-nti-muted font-mono">
                  {{ app.updatedAt ? formatDate(app.updatedAt) : '—' }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3 shrink-0">
              <NtiStatusBadge :status="app.status" />
              <ChevronRight
                class="size-4 text-nti-muted group-hover:text-nti-green transition-colors"
              />
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Quick actions -->
      <div>
        <h2 class="font-display text-base font-semibold text-nti-white mb-4">Rýchle akcie</h2>
        <div class="space-y-3">
          <RouterLink
            v-for="action in quickActions"
            :key="action.label"
            :to="action.to"
            class="card-nti group flex items-center gap-4 p-4 block"
          >
            <div
              class="size-9 rounded-lg bg-nti-green-dim border border-nti-green/20 flex items-center justify-center shrink-0"
            >
              <component :is="action.icon" class="size-4 text-nti-green" />
            </div>
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-medium text-nti-white group-hover:text-nti-green transition-colors"
              >
                {{ action.label }}
              </p>
              <p class="text-xs text-nti-muted">{{ action.desc }}</p>
            </div>
            <ChevronRight
              class="size-4 text-nti-muted group-hover:text-nti-green transition-colors shrink-0"
            />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
