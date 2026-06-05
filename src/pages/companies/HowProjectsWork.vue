<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { ArrowRight } from 'lucide-vue-next';
</script>

<template>
  <div>
    <section class="bg-circuit pt-28 pb-20">
      <div class="container-nti">
        <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// Proces</p>
        <h1 class="font-display text-5xl font-bold text-nti-white mb-4">Ako fungujú projekty</h1>
        <p class="text-nti-gray text-lg max-w-xl">
          Transparentný a štruktúrovaný proces od zadania po odovzdanie hotového riešenia.
        </p>
      </div>
    </section>

    <section class="py-20 bg-nti-black">
      <div class="container-nti max-w-3xl">
        <div class="space-y-5">
          <div
            v-for="step in [
              {
                phase: '01',
                title: 'Registrácia a profil firmy',
                desc: 'Firma sa zaregistruje, doplní identifikačné údaje, sektor a kontaktné informácie. Priradí Product Ownera a definuje interné pravidlá.',
              },
              {
                phase: '02',
                title: 'Zadanie technickej špecifikácie',
                desc: 'Firma vypracuje technickú špecifikáciu projektu, definuje rozpočet na odmenu tímu a nastaví cieľové očakávania.',
              },
              {
                phase: '03',
                title: 'Publikovanie do backlogu',
                desc: 'NTI overí zadanie a publikuje ho do backlogu projektov. Komisia zasadá a otvára výberový proces.',
              },
              {
                phase: '04',
                title: 'Výber tímu',
                desc: 'Študentské tímy predkladajú CV, motivačný list a návrh riešenia. Komisia a zástupca firmy vyberú najlepší tím.',
              },
              {
                phase: '05',
                title: 'Realizácia projektu',
                desc: 'Pridelí sa mentor a Product Owner. Evidujú sa míľniky, konzultácie, dokumentácia a výstupy.',
              },
              {
                phase: '06',
                title: 'Odovzdanie a uzavretie',
                desc: 'Finálna prezentácia, schválenie odovzdania firmou a NTI, archivácia výstupov a zhodnotenie.',
              },
            ]"
            :key="step.phase"
            class="card-nti p-6 flex gap-5"
          >
            <span class="font-mono text-2xl font-bold text-nti-green shrink-0 w-10">
              {{ step.phase }}
            </span>
            <div>
              <h3 class="font-display text-lg font-semibold text-nti-white mb-2">
                {{ step.title }}
              </h3>
              <p class="text-sm text-nti-gray leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>

        <div class="mt-10 flex flex-wrap gap-4">
          <RouterLink :to="{ name: 'register-company' }" class="btn-primary">
            Zaregistrovať firmu
            <ArrowRight class="size-4" />
          </RouterLink>
          <RouterLink :to="{ name: 'contact' }" class="btn-outline">Kontaktovať NTI</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
