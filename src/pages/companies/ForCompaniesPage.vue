<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ArrowRight, Building2, ChevronRight } from 'lucide-vue-next';
</script>

<template>
  <div>
    <section class="bg-circuit pt-28 pb-20">
      <div class="container-nti">
        <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// Pre firmy</p>
        <h1 class="font-display text-5xl font-bold text-nti-white mb-5 max-w-2xl">
          Zapojte sa ako <span class="text-gradient">partner NTI</span>
        </h1>
        <p class="text-nti-gray text-lg max-w-xl leading-relaxed mb-8">
          Zadajte reálne projekty, spoznajte mladé talenty a podporte rozvoj inovácií v regióne.
        </p>
        <RouterLink :to="{ name: 'register-company' }" class="btn-primary">
          Registrovať firmu
          <ArrowRight class="size-4" />
        </RouterLink>
      </div>
    </section>

    <section class="py-20 bg-nti-black">
      <div class="container-nti">
        <div class="grid sm:grid-cols-3 gap-5">
          <RouterLink
            v-for="link in [
              { label: 'Ako fungujú projekty', to: '/pre-firmy/ako-funguju-projekty', desc: 'Kompletný prehľad procesu od zadania po odovzdanie.' },
              { label: 'Partneri NTI', to: '/pre-firmy/partneri', desc: 'Zoznam partnerských firiem a organizácií.' },
              { label: 'Mentori', to: '/pre-firmy/mentori', desc: 'Tím skúsených mentorov z praxe.' },
            ]"
            :key="link.label"
            :to="link.to"
            class="card-nti group p-6 block"
          >
            <Building2 class="size-6 text-nti-green mb-4" />
            <h3 class="font-display font-semibold text-nti-white mb-2 group-hover:text-nti-green transition-colors">
              {{ link.label }}
            </h3>
            <p class="text-sm text-nti-gray mb-4">{{ link.desc }}</p>
            <div class="flex items-center gap-1 text-nti-green text-sm">
              Zistiť viac
              <ChevronRight class="size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>