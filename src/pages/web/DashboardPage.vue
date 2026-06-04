<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';
import { Rocket, Briefcase, ChevronRight } from 'lucide-vue-next';

const authStore = useAuthStore();
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="font-display text-2xl font-bold text-nti-white mb-1">
        Vitaj, {{ authStore.user?.firstName }}!
      </h1>
      <p class="text-sm text-nti-gray">Tu je prehľad tvojho NTI portálu.</p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <RouterLink
        v-for="card in [
          { icon: Rocket, title: 'Moje prihlášky', desc: 'Sleduj stav prihlášok do programov.', to: '#' },
          { icon: Briefcase, title: 'Aktívne výzvy', desc: 'Pozri dostupné výzvy a termine.', to: '/programy/vyzvy' },
        ]"
        :key="card.title"
        :to="card.to"
        class="card-nti group flex items-center justify-between p-6"
      >
        <div class="flex items-center gap-4">
          <div class="size-10 rounded-xl bg-nti-green-dim border border-nti-green/20 flex items-center justify-center">
            <component :is="card.icon" class="size-5 text-nti-green" />
          </div>
          <div>
            <p class="font-display font-semibold text-nti-white group-hover:text-nti-green transition-colors">
              {{ card.title }}
            </p>
            <p class="text-xs text-nti-gray">{{ card.desc }}</p>
          </div>
        </div>
        <ChevronRight class="size-4 text-nti-muted group-hover:text-nti-green transition-colors shrink-0" />
      </RouterLink>
    </div>
  </div>
</template>