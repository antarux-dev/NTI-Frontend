<script setup lang="ts">
  import { CheckCircle } from 'lucide-vue-next';
</script>

<template>
  <div>
    <section class="bg-circuit pt-28 pb-20">
      <div class="container-nti max-w-2xl">
        <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// Misia</p>
        <h1 class="font-display text-5xl font-bold text-nti-white mb-5">Naša misia</h1>
        <p class="text-nti-gray text-2xl leading-relaxed italic font-display">
          "Od študentského projektu k lídrovi na trhu."
        </p>
      </div>
    </section>

    <section class="py-20 bg-nti-black">
      <div class="container-nti max-w-3xl">
        <!-- Vision -->
        <div class="mb-12">
          <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// Vízia</p>
          <h2 class="font-display text-3xl font-bold text-nti-white mb-5">Prečo NTI existuje</h2>
          <div class="space-y-4 text-nti-gray leading-relaxed text-[15px]">
            <p>
              Nitriansky technologický inkubátor vznikol ako systematická odpoveď na tri
              pretrvávajúce výzvy regiónu: odliv technologických talentov, nedostatok reálnej praxe
              pre absolventov a absencia štruktúrovanej podpory pre inovatívne projekty na pôde
              akademickej inštitúcie.
            </p>
            <p>
              Strategickým cieľom NTI je vytvárať nové projekty, startupy a profesionálne IT tímy s
              medzinárodným potenciálom — a zároveň budovať dlhodobý ekosystém, ktorý transformuje
              Nitriansky región na relevantné centrum technologických inovácií.
            </p>
            <p>
              NTI nie je iba ďalší inkubátor. Je to platforma, kde sa stretávajú akademické
              prostredie, súkromný sektor a ambiciózni študenti — s jasne definovanými pravidlami,
              procesmi a vzájomnou zodpovednosťou.
            </p>
          </div>
        </div>

        <!-- Kľúčové hodnoty -->
        <div class="card-nti p-8 mb-8">
          <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-5">
            // Kľúčové hodnoty
          </p>
          <div class="grid sm:grid-cols-2 gap-4">
            <div
              v-for="val in [
                {
                  title: 'Inovácia s reálnym dopadom',
                  desc: 'Podporujeme projekty, ktoré riešia skutočné problémy a majú potenciál uspieť na trhu.',
                },
                {
                  title: 'Akademicko-komerčná synergia',
                  desc: 'Prepájame najlepšie z akademického prostredia s požiadavkami a skúsenosťami firemnej praxe.',
                },
                {
                  title: 'Transparentnosť a férovosť',
                  desc: 'Jasné pravidlá, otvorené procesy hodnotenia a auditná stopa každého rozhodnutia.',
                },
                {
                  title: 'Dlhodobá retencia talentov',
                  desc: 'Budujeme komunitu, kde absolventi zostávajú súčasťou ekosystému ako mentori a partneri.',
                },
                {
                  title: 'Modularita a konfigurovateľnosť',
                  desc: 'Systém sa prispôsobuje potrebám programov bez nutnosti zásahu vývojára.',
                },
                {
                  title: 'GDPR a bezpečnosť dát',
                  desc: 'Ochrana osobných údajov, informovaný súhlas a bezpečné spracovanie dokumentov.',
                },
              ]"
              :key="val.title"
              class="flex items-start gap-3"
            >
              <CheckCircle class="size-4 text-nti-green shrink-0 mt-1" />
              <div>
                <p class="text-sm font-semibold text-nti-white mb-0.5">{{ val.title }}</p>
                <p class="text-xs text-nti-gray leading-relaxed">{{ val.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- MVP vs budúcnosť -->
        <div class="card-nti p-8">
          <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-5">
            // Fázovanie
          </p>
          <h3 class="font-display text-xl font-bold text-nti-white mb-4">
            Od MVP k enterprise platforme
          </h3>
          <div class="grid sm:grid-cols-2 gap-6">
            <div>
              <p class="text-xs font-semibold text-nti-green mb-3 font-mono">MVP — v rozsahu</p>
              <ul class="space-y-1.5">
                <li
                  v-for="item in [
                    'Verejný web a programové stránky',
                    'Registrácia študentov a firiem',
                    'Podanie prihlášok a upload príloh',
                    'Workflow hodnotenia a rozhodovania',
                    'Priradenie mentorov a rolí',
                    'E-mailové notifikácie',
                    'Admin dashboard a exporty',
                    'Audit log a GDPR mechanizmy',
                  ]"
                  :key="item"
                  class="flex items-center gap-2 text-xs text-nti-gray"
                >
                  <span class="size-1.5 rounded-full bg-nti-green shrink-0" />
                  {{ item }}
                </li>
              </ul>
            </div>
            <div>
              <p class="text-xs font-semibold text-nti-muted mb-3 font-mono">Budúce fázy</p>
              <ul class="space-y-1.5">
                <li
                  v-for="item in [
                    'Automatické generovanie certifikátov',
                    'Komunitný networking modul',
                    'Pokročilé KPI dashboardy a BI',
                    'Kalendárové rezervácie mentoringu',
                    'Mobilná aplikácia',
                    'Scoring modely pre hodnotenie',
                    'Marketplace talentov a absolventov',
                    'Napojenie na CRM / ERP partnerov',
                  ]"
                  :key="item"
                  class="flex items-center gap-2 text-xs text-nti-muted"
                >
                  <span class="size-1.5 rounded-full bg-nti-muted shrink-0" />
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
