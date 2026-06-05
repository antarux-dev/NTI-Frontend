<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import {
    ArrowRight,
    Rocket,
    Briefcase,
    Users,
    Star,
    ChevronRight,
    Zap,
    CheckCircle,
    Building2,
    GraduationCap,
    MessageSquare,
    Trophy,
  } from 'lucide-vue-next';

  const pillars = [
    {
      icon: Rocket,
      title: 'Inkubácia',
      desc: 'Podpora vzniku a akcelerácie technologických projektov — od nápadu po produkt.',
    },
    {
      icon: Briefcase,
      title: 'Partnerstvá',
      desc: 'Vytvorenie stabilnej siete partnerských IT spoločností a prepojenie s praxou.',
    },
    {
      icon: Users,
      title: 'Mentoring',
      desc: 'Zabezpečiť trvalý mentorský ekosystém — skúsení odborníci sprevádzajú každý projekt.',
    },
    {
      icon: Star,
      title: 'Retencia',
      desc: 'Znížiť odliv technologických talentov z regiónu budovaním dlhodobej komunity.',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Registrácia',
      desc: 'Vytvorte si účet ako študent alebo firma. Doplňte profil, kompetencie a získajte prístup k portálu.',
      who: 'Študent / Firma',
    },
    {
      step: '02',
      title: 'Výber programu',
      desc: 'Vyberte Program A (vlastný nápad + grant) alebo Program B (firemné zadanie + odmena).',
      who: 'Študent',
    },
    {
      step: '03',
      title: 'Podanie prihlášky',
      desc: 'Odošlite prihlášku s motiváciou, dokumentáciou a príslušnými prílohami pred deadlinom výzvy.',
      who: 'Tím',
    },
    {
      step: '04',
      title: 'Hodnotenie komisie',
      desc: 'Komisia NTI vyhodnotí prihlášky. Program A kvartálne, Program B ad hoc podľa backlogu.',
      who: 'NTI Komisia',
    },
    {
      step: '05',
      title: 'Priradenie mentora',
      desc: 'Schváleným projektom sa pridelí mentor z praxe a spustí sa onboarding do programu.',
      who: 'NTI',
    },
    {
      step: '06',
      title: 'Realizácia a výstup',
      desc: 'Evidencia míľnikov, konzultácie a dokumentácia. Záverečná prezentácia a archivácia výsledkov.',
      who: 'Tím + Mentor',
    },
  ];

  const forStudentBenefits = [
    'Financovanie vlastného projektu (Program A)',
    'Reálna prax na firemnom projekte (Program B)',
    'Dedikovaný mentor z praxe',
    'Budovanie portfolia a skúseností',
    'Sieť kontaktov a komunita NTI',
  ];

  const forCompanyBenefits = [
    'Zákazkový softvér za transparentný rozpočet',
    'Prístup k motivovaným a kvalifikovaným tímom',
    'Výber tímu spolu s komisiou NTI',
    'Talent pipeline — priamy kontakt s talentmi',
    'Budovanie značky zamestnávateľa na UKF',
  ];
</script>

<template>
  <div>
    <!-- ── Hero ──────────────────────────────────────────────────────── -->
    <section class="bg-circuit relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div
        class="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-nti-green/5 blur-[120px]"
        aria-hidden="true"
      />
      <div class="container-nti py-24 relative">
        <div class="max-w-3xl">
          <div class="badge-green mb-6 inline-flex">
            <Zap class="size-3" />
            Nitriansky technologický inkubátor · UKF Nitra
          </div>

          <h1
            class="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-nti-white mb-6"
          >
            Transformujte<br />
            svoju <span class="text-gradient">budúcnosť</span>
          </h1>

          <p class="text-lg md:text-xl text-nti-gray leading-relaxed mb-10 max-w-xl">
            Zapojte sa do Nitrianského technologického inkubátora. Od študentského projektu k
            lídrovi na trhu.
          </p>

          <div class="flex flex-wrap gap-4 mb-14">
            <RouterLink :to="{ name: 'register-student' }" class="btn-primary text-base px-6 py-3">
              Som študent
              <ArrowRight class="size-4" />
            </RouterLink>
            <RouterLink :to="{ name: 'register-company' }" class="btn-outline text-base px-6 py-3">
              Som firma
            </RouterLink>
            <RouterLink :to="{ name: 'programs' }" class="btn-ghost text-base px-6 py-3">
              Zistiť viac
            </RouterLink>
          </div>

          <!-- Stats -->
          <div class="flex flex-wrap gap-8 pt-8 border-t border-nti-border">
            <div
              v-for="stat in [
                { value: '2', label: 'Programy', suffix: '' },
                { value: '4', label: 'Strategické piliere', suffix: '' },
                { value: '5', label: 'Tematických oblastí', suffix: '' },
                { value: '100', label: 'Audit akcií', suffix: '%' },
              ]"
              :key="stat.label"
            >
              <div class="font-display text-3xl font-bold text-nti-white">
                {{ stat.value }}<span class="text-nti-green">{{ stat.suffix }}</span>
              </div>
              <div class="text-xs text-nti-gray mt-1 font-mono">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Programy ───────────────────────────────────────────────────── -->
    <section class="py-24 bg-nti-black">
      <div class="container-nti">
        <div class="mb-14">
          <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// Programy</p>
          <h2 class="font-display text-4xl md:text-5xl font-bold text-nti-white mb-4">
            Dva programy, jeden cieľ
          </h2>
          <p class="text-nti-gray max-w-lg text-lg">
            Vyber si program, ktorý zodpovedá tvojim cieľom — vlastný nápad s grantom, alebo reálna
            prax na firemnom projekte.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <RouterLink :to="{ name: 'program-a' }" class="card-nti group p-8 block">
            <div class="flex items-start justify-between mb-6">
              <div
                class="size-12 rounded-xl bg-nti-green-dim border border-nti-green/20 flex items-center justify-center"
              >
                <Rocket class="size-6 text-nti-green" />
              </div>
              <span class="font-mono text-xs text-nti-muted">PROGRAM-A</span>
            </div>
            <h3
              class="font-display text-2xl font-bold text-nti-white mb-3 group-hover:text-nti-green transition-colors"
            >
              Grantový inkubačný program
            </h3>
            <p class="text-nti-gray leading-relaxed mb-4">
              Vlastný inovatívny nápad → financovanie + mentoring. Cieľom je startup alebo produkt s
              medzinárodným potenciálom.
            </p>
            <div class="flex flex-wrap gap-2 mb-6">
              <span class="badge-gray">Grant NTI</span>
              <span class="badge-gray">Mentor</span>
              <span class="badge-gray">Kvartálne kola</span>
            </div>
            <div class="flex items-center gap-2 text-nti-green text-sm font-medium">
              Zistiť viac
              <ChevronRight class="size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </RouterLink>

          <RouterLink :to="{ name: 'program-b' }" class="card-nti group p-8 block">
            <div class="flex items-start justify-between mb-6">
              <div
                class="size-12 rounded-xl bg-nti-green-dim border border-nti-green/20 flex items-center justify-center"
              >
                <Briefcase class="size-6 text-nti-green" />
              </div>
              <span class="font-mono text-xs text-nti-muted">PROGRAM-B</span>
            </div>
            <h3
              class="font-display text-2xl font-bold text-nti-white mb-3 group-hover:text-nti-green transition-colors"
            >
              Program živej praxe
            </h3>
            <p class="text-nti-gray leading-relaxed mb-4">
              Reálne zadania od firiem → prax + odmena + Product Owner. Zákazkový softvér a
              skúsenosť tímu na produkčnom projekte.
            </p>
            <div class="flex flex-wrap gap-2 mb-6">
              <span class="badge-gray">Odmena od firmy</span>
              <span class="badge-gray">Product Owner</span>
              <span class="badge-gray">Ad hoc výber</span>
            </div>
            <div class="flex items-center gap-2 text-nti-green text-sm font-medium">
              Zistiť viac
              <ChevronRight class="size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </RouterLink>
        </div>

        <div class="text-center">
          <RouterLink :to="{ name: 'programs' }" class="btn-ghost text-sm">
            Porovnanie programov →
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ── Ako to funguje ─────────────────────────────────────────────── -->
    <section class="py-24 bg-circuit-dense">
      <div class="container-nti">
        <div class="mb-14">
          <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// Proces</p>
          <h2 class="font-display text-4xl font-bold text-nti-white mb-4">Ako to funguje</h2>
          <p class="text-nti-gray max-w-lg text-lg">
            Od registrácie po odovzdanie výsledku — 6 jasných krokov.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="s in processSteps" :key="s.step" class="card-nti p-6 flex gap-4">
            <span
              class="font-mono text-2xl font-bold text-nti-green/30 shrink-0 w-10 leading-none pt-0.5"
            >
              {{ s.step }}
            </span>
            <div>
              <p class="font-display font-semibold text-nti-white mb-1">{{ s.title }}</p>
              <p class="text-xs text-nti-muted font-mono mb-2">{{ s.who }}</p>
              <p class="text-sm text-nti-gray leading-relaxed">{{ s.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Pre koho je NTI ────────────────────────────────────────────── -->
    <section class="py-24 bg-nti-black">
      <div class="container-nti">
        <div class="mb-14">
          <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// Pre koho</p>
          <h2 class="font-display text-4xl font-bold text-nti-white mb-4">NTI je pre vás, ak...</h2>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Študenti -->
          <div class="card-nti p-8">
            <div class="flex items-center gap-4 mb-6">
              <div
                class="size-12 rounded-2xl bg-nti-green-dim border border-nti-green/20 flex items-center justify-center shrink-0"
              >
                <GraduationCap class="size-6 text-nti-green" />
              </div>
              <div>
                <h3 class="font-display text-xl font-bold text-nti-white">Ste študent</h3>
                <p class="text-xs text-nti-muted font-mono">alebo vedúci tímu</p>
              </div>
            </div>
            <ul class="space-y-3 mb-8">
              <li
                v-for="b in forStudentBenefits"
                :key="b"
                class="flex items-start gap-3 text-sm text-nti-gray"
              >
                <CheckCircle class="size-4 text-nti-green shrink-0 mt-0.5" />
                {{ b }}
              </li>
            </ul>
            <RouterLink :to="{ name: 'register-student' }" class="btn-primary">
              Registrácia študenta
              <ArrowRight class="size-4" />
            </RouterLink>
          </div>

          <!-- Firmy -->
          <div class="card-nti p-8">
            <div class="flex items-center gap-4 mb-6">
              <div
                class="size-12 rounded-2xl bg-nti-green-dim border border-nti-green/20 flex items-center justify-center shrink-0"
              >
                <Building2 class="size-6 text-nti-green" />
              </div>
              <div>
                <h3 class="font-display text-xl font-bold text-nti-white">Ste firma</h3>
                <p class="text-xs text-nti-muted font-mono">alebo organizácia</p>
              </div>
            </div>
            <ul class="space-y-3 mb-8">
              <li
                v-for="b in forCompanyBenefits"
                :key="b"
                class="flex items-start gap-3 text-sm text-nti-gray"
              >
                <CheckCircle class="size-4 text-nti-green shrink-0 mt-0.5" />
                {{ b }}
              </li>
            </ul>
            <RouterLink :to="{ name: 'register-company' }" class="btn-primary">
              Registrácia firmy
              <ArrowRight class="size-4" />
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Štyri piliere ──────────────────────────────────────────────── -->
    <section class="py-24 bg-circuit-dense">
      <div class="container-nti">
        <div class="mb-14">
          <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">
            // Strategické piliere
          </p>
          <h2 class="font-display text-4xl font-bold text-nti-white mb-4">Štyri piliere NTI</h2>
          <p class="text-nti-gray max-w-lg">
            Budovanie regionálneho centra inovácií a talentov stojí na štyroch vzájomne prepojených
            pilieroch.
          </p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="(pillar, i) in pillars" :key="pillar.title" class="card-nti p-6">
            <div class="flex items-start justify-between mb-4">
              <div
                class="size-12 rounded-2xl bg-nti-green-dim border border-nti-green/20 flex items-center justify-center"
              >
                <component :is="pillar.icon" class="size-6 text-nti-green" />
              </div>
              <span class="font-mono text-xs text-nti-border">0{{ i + 1 }}</span>
            </div>
            <h3 class="font-display text-lg font-semibold text-nti-white mb-2">
              {{ pillar.title }}
            </h3>
            <p class="text-sm text-nti-gray leading-relaxed">{{ pillar.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Testimonial / Quote ────────────────────────────────────────── -->
    <section class="py-24 bg-nti-black">
      <div class="container-nti max-w-3xl text-center">
        <MessageSquare class="size-10 text-nti-green/40 mx-auto mb-6" />
        <blockquote
          class="font-display text-2xl md:text-3xl font-bold text-nti-white leading-tight mb-6 italic"
        >
          "Kľúčové odporúčanie: NTI z biznisového pohľadu potrebuje platformu, ktorá kombinuje
          marketing, intake, workflow a reporting."
        </blockquote>
        <p class="text-nti-gray text-sm font-mono">
          — Technická špecifikácia NTI · Dominik Halvoník, Solution Architekt · 03.03.2026
        </p>
      </div>
    </section>

    <!-- ── Inštitúcia ─────────────────────────────────────────────────── -->
    <section class="py-16 bg-circuit-dense">
      <div class="container-nti">
        <div class="card-nti p-8 flex flex-col sm:flex-row items-center gap-8">
          <div
            class="size-16 rounded-2xl bg-nti-surface border border-nti-border flex items-center justify-center shrink-0"
          >
            <Trophy class="size-8 text-nti-green" />
          </div>
          <div class="flex-1 text-center sm:text-left">
            <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-1">
              Zastrešené inštitúciou
            </p>
            <h3 class="font-display text-xl font-bold text-nti-white mb-1">
              Fakulta prírodných vied a informatiky, UKF Nitra
            </h3>
            <p class="text-sm text-nti-gray">
              Tr. A. Hlinku 1, 949 74 Nitra ·
              <a
                href="https://www.fpvai.ukf.sk"
                target="_blank"
                class="text-nti-green hover:underline"
              >
                www.fpvai.ukf.sk
              </a>
            </p>
          </div>
          <RouterLink :to="{ name: 'about' }" class="btn-outline shrink-0 text-sm">
            O NTI
            <ChevronRight class="size-4" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ── Final CTA ──────────────────────────────────────────────────── -->
    <section class="py-24 bg-nti-black">
      <div class="container-nti">
        <div class="card-nti p-12 text-center max-w-2xl mx-auto">
          <div class="badge-green mx-auto mb-6 inline-flex">
            <Zap class="size-3" />
            Otvorené prihlásenie
          </div>
          <h2 class="font-display text-4xl font-bold text-nti-white mb-4">Pripravený začať?</h2>
          <p class="text-nti-gray mb-10 text-lg leading-relaxed">
            Registrácia je bezplatná. Zvoľte typ účtu, doplňte profil a prihláste sa do niektorého z
            programov NTI.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <RouterLink :to="{ name: 'register-student' }" class="btn-primary text-base px-6 py-3">
              Som študent
              <ArrowRight class="size-4" />
            </RouterLink>
            <RouterLink :to="{ name: 'register-company' }" class="btn-outline text-base px-6 py-3">
              Som firma
            </RouterLink>
          </div>
          <p class="mt-6 text-xs text-nti-muted">
            Máte otázky?
            <RouterLink :to="{ name: 'faq' }" class="text-nti-green hover:underline"
              >Pozrite FAQ</RouterLink
            >
            alebo
            <RouterLink :to="{ name: 'contact' }" class="text-nti-green hover:underline"
              >kontaktujte nás</RouterLink
            >.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
