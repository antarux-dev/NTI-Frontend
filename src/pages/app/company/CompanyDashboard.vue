<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import { Briefcase, Users, ChevronRight, Plus, FileText } from 'lucide-vue-next';

  const authStore = useAuthStore();

  const stats = [
    { label: 'Projekty', value: 0, icon: Briefcase },
    { label: 'Aktívne', value: 0, icon: Briefcase },
    { label: 'Tímy', value: 0, icon: Users },
    { label: 'Prihlášky', value: 0, icon: FileText },
  ];

  const quickActions = [
    {
      label: 'Nový projekt',
      desc: 'Zadať technickú špecifikáciu',
      to: { name: 'company-new-project' },
      icon: Plus,
    },
    {
      label: 'Profil firmy',
      desc: 'Upraviť údaje o firme',
      to: { name: 'company-profile' },
      icon: Briefcase,
    },
    {
      label: 'Členovia tímu',
      desc: 'Spravovať firemných používateľov',
      to: { name: 'company-members' },
      icon: Users,
    },
  ];
</script>

<template>
  <div>
    <div class="mb-8">
      <p class="font-mono text-xs text-nti-green mb-1">// Dashboard</p>
      <h1 class="font-display text-2xl font-bold text-nti-white mb-1">
        Vitaj, {{ authStore.user?.firstName }}!
      </h1>
      <p class="text-sm text-nti-gray">Prehľad firemného portálu NTI.</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div v-for="stat in stats" :key="stat.label" class="card-nti p-5">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs text-nti-gray font-mono">{{ stat.label }}</span>
          <component :is="stat.icon" class="size-4 text-nti-green" />
        </div>
        <span class="font-display text-3xl font-bold text-nti-white">{{ stat.value }}</span>
      </div>
    </div>

    <!-- Actions -->
    <div class="grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <h2 class="font-display text-base font-semibold text-nti-white mb-4">Moje projekty</h2>
        <div class="card-nti p-10 text-center">
          <Briefcase class="size-10 text-nti-muted mx-auto mb-3" />
          <p class="font-display font-semibold text-nti-white mb-1">Žiadne projekty</p>
          <p class="text-sm text-nti-gray mb-5">
            Ešte ste nezadali žiadny projekt. Začnite pridaním technickej špecifikácie.
          </p>
          <RouterLink :to="{ name: 'company-new-project' }" class="btn-primary text-sm">
            <Plus class="size-4" />
            Pridať projekt
          </RouterLink>
        </div>
      </div>

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
