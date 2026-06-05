<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';
  import { Users, FileText, Calendar, ChevronRight, CheckCircle } from 'lucide-vue-next';

  const authStore = useAuthStore();

  const quickActions = [
    { label: 'Moje projekty', desc: 'Prehľad priradených projektov', icon: FileText },
    { label: 'Konzultácie', desc: 'Záznamy a plánovanie', icon: Calendar },
    { label: 'Tímy', desc: 'Profily tímov a členov', icon: Users },
  ];
</script>

<template>
  <div>
    <div class="mb-8">
      <p class="font-mono text-xs text-nti-green mb-1">// Mentor Dashboard</p>
      <h1 class="font-display text-2xl font-bold text-nti-white mb-1">
        Vitaj, {{ authStore.user?.firstName }}!
      </h1>
      <p class="text-sm text-nti-gray">Prehľad tvojich priradených projektov a konzultácií.</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div
        v-for="s in [
          { label: 'Projekty', value: 0, icon: FileText },
          { label: 'Aktívne', value: 0, icon: CheckCircle },
          { label: 'Konzultácie', value: 0, icon: Calendar },
          { label: 'Tímy', value: 0, icon: Users },
        ]"
        :key="s.label"
        class="card-nti p-5"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs text-nti-gray font-mono">{{ s.label }}</span>
          <component :is="s.icon" class="size-4 text-nti-green" />
        </div>
        <span class="font-display text-3xl font-bold text-nti-white">{{ s.value }}</span>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Projects -->
      <div class="lg:col-span-2">
        <h2 class="font-display text-base font-semibold text-nti-white mb-4">Priradené projekty</h2>
        <div class="card-nti p-10 text-center">
          <FileText class="size-8 text-nti-muted mx-auto mb-3" />
          <p class="font-display font-semibold text-nti-white mb-1">Žiadne projekty</p>
          <p class="text-sm text-nti-gray">NTI vám priradí projekty po otvorení výzvy.</p>
        </div>
      </div>

      <!-- Quick actions -->
      <div>
        <h2 class="font-display text-base font-semibold text-nti-white mb-4">Rýchle akcie</h2>
        <div class="space-y-3">
          <div
            v-for="a in quickActions"
            :key="a.label"
            class="card-nti flex items-center gap-4 p-4"
          >
            <div
              class="size-9 rounded-lg bg-nti-green-dim border border-nti-green/20 flex items-center justify-center shrink-0"
            >
              <component :is="a.icon" class="size-4 text-nti-green" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-nti-white">{{ a.label }}</p>
              <p class="text-xs text-nti-muted">{{ a.desc }}</p>
            </div>
            <ChevronRight class="size-4 text-nti-muted shrink-0" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
