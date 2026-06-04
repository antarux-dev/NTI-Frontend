<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { ArrowRight, CheckCircle, AlertCircle, Info, FileText, Users } from 'lucide-vue-next';
</script>

<template>
  <div>
    <section class="bg-circuit pt-28 pb-20">
      <div class="container-nti">
        <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// Podmienky</p>
        <h1 class="font-display text-5xl font-bold text-nti-white mb-4 max-w-2xl">
          Podmienky účasti
        </h1>
        <p class="text-nti-gray text-lg max-w-xl leading-relaxed">
          Kto sa môže zapojiť, aké sú požiadavky na tím a čo je potrebné doložiť pri prihlásení do
          Programu A alebo B.
        </p>
      </div>
    </section>

    <section class="py-20 bg-nti-black">
      <div class="container-nti max-w-3xl space-y-6">
        <!-- Program A – študenti -->
        <div class="card-nti p-8">
          <h2 class="font-display text-2xl font-bold text-nti-white mb-2 flex items-center gap-3">
            <div
              class="size-8 rounded-lg bg-nti-green-dim border border-nti-green/20 flex items-center justify-center"
            >
              <span class="font-mono text-xs font-bold text-nti-green">A</span>
            </div>
            Program A — Grantový inkubačný program
          </h2>
          <p class="text-sm text-nti-gray mb-6 leading-relaxed">
            Podmienky výberu nie sú tvrdou automatickou diskvalifikáciou — fungujú ako hodnotiace
            signály pre komisiu. Akademická spôsobilosť sa pri MVP overuje čestným vyhlásením a
            uploadom podkladov.
          </p>

          <div class="grid sm:grid-cols-2 gap-6">
            <div>
              <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">
                Osobné podmienky
              </p>
              <ul class="space-y-2">
                <li
                  v-for="c in [
                    'Aktívny študent vysokej školy na Slovensku',
                    'Bez prenášaných predmetov z profilových predmetov',
                    'Priemer profilových predmetov pod definovanou hranicou',
                    'Súhlas so spracovaním osobných údajov (GDPR)',
                  ]"
                  :key="c"
                  class="flex items-start gap-2 text-sm text-nti-gray"
                >
                  <CheckCircle class="size-4 text-nti-green shrink-0 mt-0.5" />
                  {{ c }}
                </li>
              </ul>
            </div>
            <div>
              <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">
                Podmienky tímu
              </p>
              <ul class="space-y-2">
                <li
                  v-for="c in [
                    'Minimálna veľkosť tímu: 3 členovia',
                    'Vlastný inovatívny nápad v niektorej z 5 kategórií',
                    'Čestné vyhlásenie o akademickej spôsobilosti',
                    'Podanie prihlášky pred deadlinom výzvy',
                  ]"
                  :key="c"
                  class="flex items-start gap-2 text-sm text-nti-gray"
                >
                  <CheckCircle class="size-4 text-nti-green shrink-0 mt-0.5" />
                  {{ c }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Povinná dokumentácia A -->
          <div class="mt-6 border-t border-nti-border pt-6">
            <p
              class="font-mono text-xs text-nti-green uppercase tracking-widest mb-4 flex items-center gap-2"
            >
              <FileText class="size-3.5" />
              Povinná projektová dokumentácia
            </p>
            <div class="grid sm:grid-cols-2 gap-3">
              <div
                v-for="(doc, i) in [
                  'Executive Summary — problém, riešenie, trh, prínos',
                  'Technická architektúra — technológie, moduly, prevádzka',
                  'Roadmapa — míľniky, harmonogram realizácie',
                  'Rozpočet — plán čerpania grantu a náklady',
                  'Riziková analýza — riziká, dopady, mitigácie',
                  'Monetizačný model — tvorba hodnoty a príjmov',
                ]"
                :key="doc"
                class="flex items-start gap-2 text-sm text-nti-gray"
              >
                <span
                  class="size-5 rounded-full bg-nti-surface border border-nti-border flex items-center justify-center font-mono text-xs text-nti-muted shrink-0 mt-0.5"
                >
                  {{ i + 1 }}
                </span>
                {{ doc }}
              </div>
            </div>
          </div>
        </div>

        <!-- Program B – firmy -->
        <div class="card-nti p-8">
          <h2 class="font-display text-2xl font-bold text-nti-white mb-2 flex items-center gap-3">
            <div
              class="size-8 rounded-lg bg-nti-green-dim border border-nti-green/20 flex items-center justify-center"
            >
              <span class="font-mono text-xs font-bold text-nti-green">B</span>
            </div>
            Program B — Živá prax (firmy)
          </h2>
          <p class="text-sm text-nti-gray mb-6 leading-relaxed">
            Firma vstupuje do programu ako zadávateľ. Pre úspešný onboarding musí mať vyplnený
            firemný profil a pripravenú technickú špecifikáciu.
          </p>
          <ul class="space-y-2">
            <li
              v-for="c in [
                'Registrovaná právnická osoba v SR alebo EÚ',
                'Vyplnený firemný profil s IČO, sektorom a kontaktmi',
                'Definovaná technická špecifikácia projektu',
                'Pridelený Product Owner za stranu firmy',
                'Alokovaný rozpočet na odmenu študentského tímu',
                'Možnosť zadať jednu alebo viac špecifikácií ročne',
              ]"
              :key="c"
              class="flex items-start gap-2 text-sm text-nti-gray"
            >
              <CheckCircle class="size-4 text-nti-green shrink-0 mt-0.5" />
              {{ c }}
            </li>
          </ul>
        </div>

        <!-- Program B – tím -->
        <div class="card-nti p-8">
          <h2 class="font-display text-2xl font-bold text-nti-white mb-2 flex items-center gap-3">
            <Users class="size-6 text-nti-green" />
            Program B — Živá prax (študentský tím)
          </h2>
          <p class="text-sm text-nti-gray mb-6 leading-relaxed">
            Tím sa prihlasuje na konkrétne firemné zadanie. Výber realizuje komisia spoločne so
            zástupcom firmy ad hoc podľa backlogu projektov.
          </p>
          <div class="grid sm:grid-cols-2 gap-3">
            <div
              v-for="c in [
                'Aktívni študenti VŠ na Slovensku',
                'Zostavený tím s definovanými rolami',
                'Odovzdanie CV každého člena tímu',
                'Motivačný list k danému zadaniu',
                'Návrh realizačného riešenia (technický)',
                'Súhlas so spracovaním osobných údajov',
              ]"
              :key="c"
              class="flex items-start gap-2 text-sm text-nti-gray"
            >
              <CheckCircle class="size-4 text-nti-green shrink-0 mt-0.5" />
              {{ c }}
            </div>
          </div>
        </div>

        <!-- Info box -->
        <div class="rounded-lg border border-blue-500/20 bg-blue-500/8 p-5 flex gap-4">
          <Info class="size-5 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p class="font-medium text-blue-300 mb-1 text-sm">Hodnotenie komisie</p>
            <p class="text-sm text-nti-gray leading-relaxed">
              Splnenie podmienok automaticky nezaručuje prijatie. Komisia hodnotí každú prihlášku
              individuálne — podmienky slúžia ako hodnotiace signály, nie tvrdá diskvalifikácia.
              Program A hodnotí kvartálne, Program B ad hoc podľa backlogu.
            </p>
          </div>
        </div>

        <!-- Warning -->
        <div class="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-5 flex gap-4">
          <AlertCircle class="size-5 text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <p class="font-medium text-yellow-300 mb-1 text-sm">Dôležité upozornenie</p>
            <p class="text-sm text-nti-gray leading-relaxed">
              Prihlášky sa podávajú výhradne cez NTI portál pred uzávierkou príslušnej výzvy.
              Neúplné prihlášky môžu byť vrátené na doplnenie alebo zamietnuté pri formálnej
              kontrole.
            </p>
          </div>
        </div>

        <!-- CTA -->
        <div class="flex flex-wrap gap-4 pt-2">
          <RouterLink :to="{ name: 'register-student' }" class="btn-primary">
            Registrácia študenta / tímu
            <ArrowRight class="size-4" />
          </RouterLink>
          <RouterLink :to="{ name: 'register-company' }" class="btn-outline">
            Registrácia firmy
          </RouterLink>
          <RouterLink :to="{ name: 'faq' }" class="btn-ghost"> Pozrieť FAQ </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
