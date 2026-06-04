<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { GraduationCap, Building2, UserPlus, ArrowRight } from 'lucide-vue-next';
import type { RegistrationType } from '@/types';

interface RegOption {
  type: RegistrationType;
  icon: typeof GraduationCap;
  title: string;
  subtitle: string;
  description: string;
  to: string;
  badge?: string;
}

const options: RegOption[] = [
  {
    type: 'student',
    icon: GraduationCap,
    title: 'Študent',
    subtitle: 'Pre individuálnych uchádzačov',
    description:
      'Zaregistruj sa ako študent alebo vedúci tímu. Podaj prihlášku do Programu A alebo B, sleduj stav a spravuj profil.',
    to: '/auth/registracia/student',
  },
  {
    type: 'company',
    icon: Building2,
    title: 'Firma / Partner',
    subtitle: 'Pre organizácie a partnerov',
    description:
      'Zaregistruj svoju firmu, zadávaj technické špecifikácie, spravuj výzvy a vstúp do Programu B ako zadávateľ.',
    to: '/auth/registracia/firma',
  },
  {
    type: 'member',
    icon: UserPlus,
    title: 'Člen firmy',
    subtitle: 'Na základe pozvánky',
    description:
      'Ak ste dostali pozvánku od svojej firmy, zaregistrujte sa pomocou vygenerovaného invite tokenu.',
    to: '/auth/registracia/clen',
    badge: 'Vyžaduje pozvánku',
  },
];
</script>

<template>
  <div>
    <!-- Header -->
    <div class="card-nti p-8 mb-4">
      <h1 class="font-display text-2xl font-bold text-nti-white mb-2">
        Registrácia
      </h1>
      <p class="text-sm text-nti-gray">
        Už máte účet?
        <RouterLink
          :to="{ name: 'login' }"
          class="text-nti-green hover:text-nti-green-light transition-colors"
        >
          Prihláste sa
        </RouterLink>
      </p>
    </div>

    <!-- Options -->
    <div class="space-y-3">
      <RouterLink
        v-for="option in options"
        :key="option.type"
        :to="option.to"
        class="card-nti group flex items-start gap-5 p-6 block"
      >
        <div class="size-11 rounded-xl bg-nti-green-dim border border-nti-green/20 flex items-center justify-center shrink-0 mt-0.5">
          <component :is="option.icon" class="size-5 text-nti-green" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-3 mb-1">
            <span class="font-display font-semibold text-nti-white group-hover:text-nti-green transition-colors">
              {{ option.title }}
            </span>
            <span
              v-if="option.badge"
              class="badge-gray text-xs"
            >
              {{ option.badge }}
            </span>
          </div>
          <p class="text-xs text-nti-green mb-2 font-mono">{{ option.subtitle }}</p>
          <p class="text-sm text-nti-gray leading-relaxed">{{ option.description }}</p>
        </div>
        <ArrowRight class="size-4 text-nti-muted group-hover:text-nti-green transition-colors shrink-0 mt-1" />
      </RouterLink>
    </div>
  </div>
</template>