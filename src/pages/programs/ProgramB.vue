<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import {
    Briefcase,
    ArrowRight,
    Building2,
    Users,
    Trophy,
    CheckCircle,
    ChevronRight,
    FileText,
    Target,
    Layers,
  } from 'lucide-vue-next';
</script>

<template>
  <div>
    <!-- ── Hero ──────────────────────────────────────────────────────── -->
    <section class="bg-circuit pt-28 pb-20 relative overflow-hidden">
      <div
        class="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-nti-green/4 blur-[80px]"
        aria-hidden="true"
      />
      <div class="container-nti relative">
        <div class="flex items-center gap-3 mb-5">
          <span class="badge-green">Program B</span>
          <span class="font-mono text-xs text-nti-muted">Program živej praxe</span>
        </div>
        <h1
          class="font-display text-5xl md:text-6xl font-bold text-nti-white mb-5 max-w-3xl leading-tight"
        >
          Reálna prax <span class="text-gradient">od firiem</span>
        </h1>
        <p class="text-nti-gray text-lg max-w-xl leading-relaxed mb-10">
          Program B prepája reálne zadania zo súkromného sektora so študentskými tímami. NTI
          vystupuje ako sprostredkovateľ — tím dostane odmenu, prax a Product Ownera. Výsledkom je
          zákazkový softvér a skúsenosť na produkčnom projekte.
        </p>
        <div class="flex flex-wrap gap-4">
          <RouterLink :to="{ name: 'register-student' }" class="btn-primary text-base px-6 py-3">
            Registrovať tím
            <ArrowRight class="size-4" />
          </RouterLink>
          <RouterLink :to="{ name: 'register-company' }" class="btn-outline text-base px-6 py-3">
            Zadať projekt ako firma
          </RouterLink>
        </div>

        <!-- Quick facts -->
        <div class="flex flex-wrap gap-6 mt-12">
          <div
            v-for="fact in [
              { label: 'Frekvencia výberu', value: 'Ad hoc' },
              { label: 'Financovanie', value: 'Rozpočet firmy' },
              { label: 'Výstup', value: 'Zákazkový softvér' },
              { label: 'Vedenie', value: 'PO + Mentor' },
            ]"
            :key="fact.label"
          >
            <p class="font-display text-xl font-bold text-nti-white">{{ fact.value }}</p>
            <p class="text-xs text-nti-gray mt-0.5 font-mono">{{ fact.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Business model ─────────────────────────────────────────────── -->
    <section class="py-20 bg-nti-black">
      <div class="container-nti">
        <div class="mb-12">
          <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// Subjekty</p>
          <h2 class="font-display text-4xl font-bold text-nti-white mb-3">
            Traja hráči, jeden cieľ
          </h2>
          <p class="text-nti-gray max-w-lg">
            Program B je postavený na jasnom rozdelení zodpovedností medzi NTI, firmu a tím.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- NTI -->
          <div class="card-nti p-7">
            <div
              class="size-12 rounded-2xl bg-nti-green-dim border border-nti-green/20 flex items-center justify-center mb-5"
            >
              <Layers class="size-6 text-nti-green" />
            </div>
            <h3 class="font-display text-lg font-semibold text-nti-white mb-1">NTI</h3>
            <p class="text-xs text-nti-green font-mono mb-4">Sprostredkovateľ</p>
            <ul class="space-y-2">
              <li
                v-for="item in [
                  'Správa výziev a backlogu',
                  'Párovanie tímu s firmou',
                  'Priraďovanie mentora',
                  'Koordinácia komisie',
                  'Administrácia celého procesu',
                ]"
                :key="item"
                class="flex items-start gap-2 text-sm text-nti-gray"
              >
                <CheckCircle class="size-3.5 text-nti-green shrink-0 mt-0.5" />
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- Firma -->
          <div class="card-nti p-7">
            <div
              class="size-12 rounded-2xl bg-nti-green-dim border border-nti-green/20 flex items-center justify-center mb-5"
            >
              <Building2 class="size-6 text-nti-green" />
            </div>
            <h3 class="font-display text-lg font-semibold text-nti-white mb-1">Firma</h3>
            <p class="text-xs text-nti-green font-mono mb-4">Zadávateľ (Klient)</p>
            <ul class="space-y-2">
              <li
                v-for="item in [
                  'Dodá technickú špecifikáciu (1× ročne)',
                  'Poskytne Product Ownera',
                  'Alokuje rozpočet na odmenu tímu',
                  'Definuje cieľové očakávania',
                  'Schvaľuje odovzdanie výsledku',
                ]"
                :key="item"
                class="flex items-start gap-2 text-sm text-nti-gray"
              >
                <CheckCircle class="size-3.5 text-nti-green shrink-0 mt-0.5" />
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- Tím -->
          <div class="card-nti p-7">
            <div
              class="size-12 rounded-2xl bg-nti-green-dim border border-nti-green/20 flex items-center justify-center mb-5"
            >
              <Users class="size-6 text-nti-green" />
            </div>
            <h3 class="font-display text-lg font-semibold text-nti-white mb-1">Študentský tím</h3>
            <p class="text-xs text-nti-green font-mono mb-4">Realizátor</p>
            <ul class="space-y-2">
              <li
                v-for="item in [
                  'Zostavenie tímu podľa požiadaviek',
                  'Predloženie životopisov a motivácie',
                  'Návrh realizačného riešenia',
                  'Implementácia a dokumentácia',
                  'Finálna prezentácia produktu',
                ]"
                :key="item"
                class="flex items-start gap-2 text-sm text-nti-gray"
              >
                <CheckCircle class="size-3.5 text-nti-green shrink-0 mt-0.5" />
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Výberový proces ────────────────────────────────────────────── -->
    <section class="py-20 bg-circuit-dense">
      <div class="container-nti">
        <div class="mb-12">
          <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">
            // Výberový proces
          </p>
          <h2 class="font-display text-4xl font-bold text-nti-white mb-3">
            Ako prebieha výber tímu
          </h2>
          <p class="text-nti-gray max-w-lg">
            Komisia zasadá ad hoc podľa backlogu projektov. Výber tímu realizuje komisia spoločne so
            zástupcom firmy.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-4 max-w-3xl">
          <div
            v-for="(step, i) in [
              {
                title: 'Registrácia a profil tímu',
                desc: 'Tím sa zaregistruje, doplní profily členov, nahrá CV a definuje kompetencie a záujem o konkrétnu oblasť.',
              },
              {
                title: 'Publikovanie zadania do backlogu',
                desc: 'Firma odovzdá technickú špecifikáciu. NTI ju overí a zverejní do backlogu dostupných projektov.',
              },
              {
                title: 'Prihláška tímu na projekt',
                desc: 'Tím odovzdá životopisy, motivačný list a návrh realizačného riešenia pre konkrétne zadanie.',
              },
              {
                title: 'Hodnotenie komisiou + firma',
                desc: 'Komisia NTI a zástupca firmy spoločne vyberú najvhodnejší tím podľa predložených materiálov.',
              },
              {
                title: 'Priradenie mentora a PO',
                desc: 'Po výbere sa pridelí mentor za NTI a Product Owner za firmu. Spustí sa onboarding projektu.',
              },
              {
                title: 'Realizácia a odovzdanie',
                desc: 'Evidencia míľnikov, backlogu, konzultácií a výstupov. Záverečná prezentácia a schválenie firmou.',
              },
            ]"
            :key="step.title"
            class="card-nti p-5 flex gap-4 items-start"
          >
            <span
              class="size-7 rounded-full bg-nti-green-dim border border-nti-green/30 flex items-center justify-center font-mono text-xs text-nti-green font-bold shrink-0"
            >
              {{ i + 1 }}
            </span>
            <div>
              <p class="font-display font-semibold text-nti-white text-sm mb-1">{{ step.title }}</p>
              <p class="text-xs text-nti-gray leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Firemný onboarding ─────────────────────────────────────────── -->
    <section class="py-20 bg-nti-black">
      <div class="container-nti">
        <div class="grid lg:grid-cols-2 gap-10 items-start">
          <!-- Požiadavky na firmu -->
          <div>
            <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">
              // Pre firmy
            </p>
            <h2 class="font-display text-4xl font-bold text-nti-white mb-5">
              Čo firma vstupom získava
            </h2>
            <p class="text-nti-gray leading-relaxed mb-8">
              Firma zadaním projektu do Program B získava prístup k motivovaným študentským tímom,
              znižuje náklady na vývoj a zároveň buduje dlhodobý talent pipeline.
            </p>
            <ul class="space-y-3">
              <li
                v-for="c in [
                  'Prístup k motivovaným a kvalifikovaným tímom',
                  'Zákazkový softvér za transparentný rozpočet',
                  'Výber tímu spolu s komisiou NTI',
                  'Pridelený mentor, ktorý dohliada na realizáciu',
                  'Evidencia výstupov a míľnikov v portáli',
                  'Talent pipeline — priamy kontakt s budúcimi zamestnancami',
                ]"
                :key="c"
                class="flex items-start gap-3 text-sm text-nti-gray"
              >
                <CheckCircle class="size-4 text-nti-green shrink-0 mt-0.5" />
                {{ c }}
              </li>
            </ul>
          </div>

          <!-- Stav zadania -->
          <div class="card-nti p-7">
            <h3 class="font-display font-semibold text-nti-white mb-2 flex items-center gap-2">
              <Target class="size-5 text-nti-green" />
              Životný cyklus zadania
            </h3>
            <p class="text-sm text-nti-gray mb-6">
              Každé firemné zadanie prechádza týmito stavmi v portáli NTI:
            </p>
            <div class="space-y-3">
              <div
                v-for="s in [
                  {
                    status: 'Draft',
                    desc: 'Firma pripravuje technickú špecifikáciu.',
                    color: 'badge-gray',
                  },
                  {
                    status: 'Publikované do backlogu',
                    desc: 'NTI zverejnilo zadanie. Tímy sa môžu prihlasovať.',
                    color: 'badge-green',
                  },
                  {
                    status: 'V párovaní',
                    desc: 'Komisia hodnotí prihlásené tímy.',
                    color:
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20',
                  },
                  {
                    status: 'Pridelené',
                    desc: 'Tím bol vybraný, prebieha onboarding.',
                    color: 'badge-green',
                  },
                  {
                    status: 'V realizácii',
                    desc: 'Projekt aktívne prebieha.',
                    color: 'badge-green',
                  },
                  {
                    status: 'Uzavreté',
                    desc: 'Výstup bol odovzdaný a schválený.',
                    color: 'badge-gray',
                  },
                ]"
                :key="s.status"
                class="flex items-start gap-3"
              >
                <span :class="s.color" class="shrink-0 mt-0.5">{{ s.status }}</span>
                <p class="text-xs text-nti-gray leading-relaxed">{{ s.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Sledovanie realizácie ──────────────────────────────────────── -->
    <section class="py-20 bg-circuit-dense">
      <div class="container-nti">
        <div class="mb-12">
          <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">
            // Sledovanie
          </p>
          <h2 class="font-display text-4xl font-bold text-nti-white mb-3">
            Transparentná realizácia
          </h2>
          <p class="text-nti-gray max-w-lg">
            Celý priebeh projektu je evidovaný v portáli NTI — prístupný firme, tímu aj NTI
            administrátorovi.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="item in [
              {
                icon: Layers,
                title: 'Backlog požiadaviek',
                desc: 'Evidencia zadania, user stories a technickej špecifikácie.',
              },
              {
                icon: Trophy,
                title: 'Míľniky projektu',
                desc: 'Sledovanie stavu plnenia, termínov a výstupov jednotlivých fáz.',
              },
              {
                icon: FileText,
                title: 'Záznamy z mentoringu',
                desc: 'Priebežné konzultácie, zápisy a spätná väzba mentora.',
              },
              {
                icon: CheckCircle,
                title: 'Schválenie odovzdania',
                desc: 'Záverečná prezentácia a dvojstranné schválenie (firma + NTI).',
              },
            ]"
            :key="item.title"
            class="card-nti p-6"
          >
            <component :is="item.icon" class="size-7 text-nti-green mb-4" />
            <h3 class="font-display font-semibold text-nti-white mb-2 text-sm">{{ item.title }}</h3>
            <p class="text-xs text-nti-gray leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ───────────────────────────────────────────────────────── -->
    <section class="py-20 bg-nti-black">
      <div class="container-nti">
        <div class="grid md:grid-cols-2 gap-6 max-w-3xl">
          <div class="card-nti p-8">
            <Users class="size-10 text-nti-green mb-5" />
            <h3 class="font-display text-xl font-bold text-nti-white mb-3">Som študent / tím</h3>
            <p class="text-nti-gray text-sm mb-6 leading-relaxed">
              Zaregistruj sa, doplň profil a prihláste sa na firemný projekt. Získate prax, odmenu a
              skúsenosť na reálnom produkčnom projekte.
            </p>
            <RouterLink :to="{ name: 'register-student' }" class="btn-primary">
              Registrácia tímu
              <ArrowRight class="size-4" />
            </RouterLink>
          </div>
          <div class="card-nti p-8">
            <Briefcase class="size-10 text-nti-green mb-5" />
            <h3 class="font-display text-xl font-bold text-nti-white mb-3">Som firma</h3>
            <p class="text-nti-gray text-sm mb-6 leading-relaxed">
              Zaregistrujte firmu, zadajte technickú špecifikáciu a definujte Product Ownera. NTI za
              vás vyberie najlepší tím.
            </p>
            <RouterLink :to="{ name: 'register-company' }" class="btn-primary">
              Registrácia firmy
              <ArrowRight class="size-4" />
            </RouterLink>
          </div>
        </div>

        <div class="mt-6">
          <RouterLink :to="{ name: 'program-a' }" class="btn-ghost text-sm">
            Pozrieť aj Program A (Grant)
            <ChevronRight class="size-4" />
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
