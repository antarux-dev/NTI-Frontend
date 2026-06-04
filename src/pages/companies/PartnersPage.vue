<script setup lang="ts">
  import { Building2 } from 'lucide-vue-next';

  const partners = [
    { name: 'UKF Nitra', sector: 'Akademická inštitúcia', website: 'https://www.ukf.sk' },
    { name: 'Fakulta PVaI', sector: 'Vzdelávanie', website: 'https://www.fpvai.ukf.sk' },
  ];
</script>

<template>
  <div>
    <section class="bg-circuit pt-28 pb-20">
      <div class="container-nti">
        <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// Partneri</p>
        <h1 class="font-display text-5xl font-bold text-nti-white mb-4">Partneri NTI</h1>
        <p class="text-nti-gray text-lg max-w-xl">Firmy a organizácie, ktoré spolupracujú s NTI.</p>
      </div>
    </section>

    <section class="py-20 bg-nti-black">
      <div class="container-nti">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <a
            v-for="partner in partners"
            :key="partner.name"
            :href="partner.website"
            target="_blank"
            rel="noopener noreferrer"
            class="card-nti group p-6 block"
          >
            <div
              class="size-12 rounded-xl bg-nti-surface border border-nti-border flex items-center justify-center mb-4"
            >
              <Building2 class="size-6 text-nti-gray" />
            </div>
            <h3
              class="font-display font-semibold text-nti-white group-hover:text-nti-green transition-colors mb-1"
            >
              {{ partner.name }}
            </h3>
            <p class="text-xs text-nti-muted font-mono">{{ partner.sector }}</p>
          </a>

          <!-- Coming soon placeholder -->
          <div class="card-nti p-6 border-dashed opacity-50">
            <div
              class="size-12 rounded-xl bg-nti-surface border border-dashed border-nti-border flex items-center justify-center mb-4"
            >
              <span class="text-nti-muted text-lg">+</span>
            </div>
            <p class="font-display font-medium text-nti-gray">Váš logo tu</p>
            <p class="text-xs text-nti-muted mt-1">Staňte sa partnerom NTI</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
