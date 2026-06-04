<script setup lang="ts">
import { User } from 'lucide-vue-next';
import type { Mentor } from '@/types';

const mentors: Mentor[] = [
  {
    id: 1,
    firstName: 'NTI',
    lastName: 'Mentor',
    title: 'Senior Developer',
    bio: 'Skúsený odborník z praxe priraďovaný k projektom v rámci NTI mentoring programu.',
    expertise: ['Vývoj softvéru', 'Projektový manažment', 'Architektonický dizajn'],
  },
];
</script>

<template>
  <div>
    <section class="bg-circuit pt-28 pb-20">
      <div class="container-nti">
        <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// Mentori</p>
        <h1 class="font-display text-5xl font-bold text-nti-white mb-4">Mentori NTI</h1>
        <p class="text-nti-gray text-lg max-w-xl">
          Skúsení odborníci z praxe, ktorí sprevádzajú projekty a tímy počas inkubácie.
        </p>
      </div>
    </section>

    <section class="py-20 bg-nti-black">
      <div class="container-nti">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="mentor in mentors"
            :key="mentor.id"
            class="card-nti p-6"
          >
            <div class="size-14 rounded-2xl bg-nti-surface border border-nti-border flex items-center justify-center mb-4">
              <User class="size-7 text-nti-gray" />
            </div>
            <h3 class="font-display font-semibold text-nti-white mb-0.5">
              {{ mentor.firstName }} {{ mentor.lastName }}
            </h3>
            <p class="text-xs text-nti-green font-mono mb-3">{{ mentor.title }}</p>
            <p class="text-sm text-nti-gray leading-relaxed mb-4">{{ mentor.bio }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in mentor.expertise"
                :key="skill"
                class="badge-gray"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>