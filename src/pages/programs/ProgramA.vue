<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import {
    Rocket,
    ArrowRight,
    CheckCircle,
    FileText,
    Cpu,
    Globe,
    Brain,
    Gamepad2,
    Zap,
    Users,
    Calendar,
    ChevronRight,
  } from 'lucide-vue-next';
</script>

<template>
  <div>
    <!-- ── Hero ──────────────────────────────────────────────────────── -->
    <section class="bg-circuit pt-28 pb-20 relative overflow-hidden">
      <div
        class="pointer-events-none absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-nti-green/5 blur-[80px]"
        aria-hidden="true"
      />
      <div class="container-nti relative">
        <div class="flex items-center gap-3 mb-5">
          <span class="badge-green">Program A</span>
          <span class="font-mono text-xs text-nti-muted">Grantový inkubačný program</span>
        </div>
        <h1
          class="font-display text-5xl md:text-6xl font-bold text-nti-white mb-5 max-w-3xl leading-tight"
        >
          Inkubuj vlastný <span class="text-gradient">nápad</span>
        </h1>
        <p class="text-nti-gray text-lg max-w-xl leading-relaxed mb-10">
          Program A je určený pre študentov a tímy s vlastným inovatívnym nápadom. Cieľom je startup
          alebo produkt s medzinárodným potenciálom — financovaný, mentorovaný a inkubovaný priamo
          na pôde UKF Nitra.
        </p>
        <div class="flex flex-wrap gap-4">
          <RouterLink :to="{ name: 'register-student' }" class="btn-primary text-base px-6 py-3">
            Prihlásiť sa do Programu A
            <ArrowRight class="size-4" />
          </RouterLink>
          <RouterLink :to="{ name: 'challenges' }" class="btn-outline text-base px-6 py-3">
            Aktívne výzvy
          </RouterLink>
        </div>

        <!-- Quick facts -->
        <div class="flex flex-wrap gap-6 mt-12">
          <div
            v-for="fact in [
              { label: 'Frekvencia výberu', value: 'Kvartálne' },
              { label: 'Min. veľkosť tímu', value: '3 členovia' },
              { label: 'Financovanie', value: 'Grant NTI' },
              { label: 'Vedenie projektu', value: 'Mentor' },
            ]"
            :key="fact.label"
          >
            <p class="font-display text-xl font-bold text-nti-white">{{ fact.value }}</p>
            <p class="text-xs text-nti-gray mt-0.5 font-mono">{{ fact.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Čo získaš ──────────────────────────────────────────────────── -->
    <section class="py-20 bg-nti-black">
      <div class="container-nti">
        <div class="mb-12">
          <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// Benefity</p>
          <h2 class="font-display text-4xl font-bold text-nti-white mb-3">Čo program ponúka</h2>
          <p class="text-nti-gray max-w-lg">
            Program A kombinuje finančnú podporu, odborné sprevádzanie a prístup k ekosystému NTI.
            Všetko čo potrebuješ na to, aby si z nápadu spravil produkt.
          </p>
        </div>

        <div class="grid sm:grid-cols-3 gap-5">
          <div
            v-for="b in [
              {
                icon: Rocket,
                title: 'Grant NTI',
                desc: 'Priame financovanie na realizáciu projektu — pokrytie nákladov na vývoj, infraštruktúru a MVP. Čerpanie je viazané na plnenie míľnikov.',
              },
              {
                icon: Users,
                title: 'Dedikovaný mentor',
                desc: 'Priraďuje sa mentor z praxe. Pravidelné konzultácie, zápisy z mentoringu, spätná väzba a sledovanie progresu počas celej doby inkubácie.',
              },
              {
                icon: Zap,
                title: 'Inkubačná podpora',
                desc: 'Prístup k infraštruktúre NTI, sieti kontaktov, partnerským firmám a komunite absolventov. Pripravenosť na medzinárodný trh.',
              },
            ]"
            :key="b.title"
            class="card-nti p-7"
          >
            <div
              class="size-12 rounded-2xl bg-nti-green-dim border border-nti-green/20 flex items-center justify-center mb-5"
            >
              <component :is="b.icon" class="size-6 text-nti-green" />
            </div>
            <h3 class="font-display text-lg font-semibold text-nti-white mb-2">{{ b.title }}</h3>
            <p class="text-sm text-nti-gray leading-relaxed">{{ b.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Tematické kategórie ─────────────────────────────────────────── -->
    <section class="py-20 bg-circuit-dense">
      <div class="container-nti">
        <div class="mb-12">
          <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">
            // Tematické kategórie
          </p>
          <h2 class="font-display text-4xl font-bold text-nti-white mb-3">5 oblastí záujmu</h2>
          <p class="text-nti-gray max-w-lg">
            Tím si vyberá tematickú oblasť, ktorá zodpovedá jeho nápadu a kompetenciám. Každá
            kategória má prislúchajúce kvalifikačné stacky.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="cat in [
              {
                icon: Cpu,
                label: 'Vývoj softvéru',
                desc: 'Desktop, mobilné aplikácie, embedded systémy.',
                stack: 'Stack 01',
                tags: ['Objektové technológie', 'Mobilné aplikácie', 'Senzory', 'Testovanie'],
              },
              {
                icon: Brain,
                label: 'AI a dátové technológie',
                desc: 'Umelá inteligencia, strojové učenie, dátová analytika.',
                stack: 'Stack 02',
                tags: ['Databázy', 'Strojové učenie', 'Neurónové siete', 'Hĺbková analýza'],
              },
              {
                icon: Globe,
                label: 'Webové aplikácie',
                desc: 'Internetové a prehliadačové aplikácie.',
                stack: 'Stack 03',
                tags: ['Jazyky webu', 'Frontend / Backend', 'Java platform'],
              },
              {
                icon: Gamepad2,
                label: 'Herný vývoj',
                desc: 'Herné aplikácie, 3D, virtuálna a rozšírená realita.',
                stack: 'Stack 04',
                tags: ['Herné prostredia', 'Vývoj 3D', 'VR / AR'],
              },
              {
                icon: Zap,
                label: 'IoT a embedded systémy',
                desc: 'Internet vecí, priemyselné a robotické systémy.',
                stack: 'Stack 05',
                tags: ['Jazyk C', 'Internet vecí', 'Robotika', 'Priemyselné systémy'],
              },
            ]"
            :key="cat.label"
            class="card-nti p-6"
          >
            <div class="flex items-start justify-between mb-4">
              <div
                class="size-10 rounded-xl bg-nti-green-dim border border-nti-green/20 flex items-center justify-center"
              >
                <component :is="cat.icon" class="size-5 text-nti-green" />
              </div>
              <span class="font-mono text-xs text-nti-muted">{{ cat.stack }}</span>
            </div>
            <h3 class="font-display font-semibold text-nti-white mb-1">{{ cat.label }}</h3>
            <p class="text-sm text-nti-gray mb-4 leading-relaxed">{{ cat.desc }}</p>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="tag in cat.tags" :key="tag" class="badge-gray text-xs">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Podmienky výberu ───────────────────────────────────────────── -->
    <section class="py-20 bg-nti-black">
      <div class="container-nti">
        <div class="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">
              // Podmienky
            </p>
            <h2 class="font-display text-4xl font-bold text-nti-white mb-5">
              Kto sa môže prihlásiť
            </h2>
            <p class="text-nti-gray leading-relaxed mb-8">
              Kritériá výberu nie sú tvrdou automatickou diskvalifikáciou — slúžia ako hodnotiace
              signály pre komisiu. Akademická spôsobilosť sa pri MVP overuje čestným vyhlásením a
              uploadom podkladov.
            </p>
            <ul class="space-y-3">
              <li
                v-for="c in [
                  'Aktívny študent vysokej školy na Slovensku',
                  'Tím minimálne 3 členov',
                  'Bez prenášaných predmetov z profilových predmetov',
                  'Priemer profilových predmetov pod definovanou hranicou',
                  'Vlastný inovatívny nápad v niektorej z 5 kategórií',
                  'Odovzdanie čestného vyhlásenia o akademickej spôsobilosti',
                ]"
                :key="c"
                class="flex items-start gap-3 text-sm text-nti-gray"
              >
                <CheckCircle class="size-4 text-nti-green shrink-0 mt-0.5" />
                {{ c }}
              </li>
            </ul>
          </div>

          <!-- Povinná dokumentácia -->
          <div class="card-nti p-7">
            <h3 class="font-display font-semibold text-nti-white mb-5 flex items-center gap-2">
              <FileText class="size-5 text-nti-green" />
              Povinná projektová dokumentácia
            </h3>
            <div class="space-y-3">
              <div
                v-for="(doc, i) in [
                  {
                    title: 'Executive Summary',
                    desc: 'Stručný opis problému, riešenia, trhu a prínosu.',
                  },
                  {
                    title: 'Technická architektúra',
                    desc: 'Opis riešenia, technológií, modulov a prevádzky.',
                  },
                  { title: 'Roadmapa', desc: 'Míľniky, plán realizácie a harmonogram.' },
                  { title: 'Rozpočet', desc: 'Plán čerpania grantu a očakávané náklady.' },
                  { title: 'Riziková analýza', desc: 'Identifikácia rizík, dopadov a mitigácií.' },
                  {
                    title: 'Monetizačný model',
                    desc: 'Spôsob vytvárania hodnoty a príjmov produktu.',
                  },
                ]"
                :key="doc.title"
                class="flex gap-4 items-start"
              >
                <span
                  class="size-6 rounded-full bg-nti-green-dim border border-nti-green/20 flex items-center justify-center font-mono text-xs text-nti-green font-bold shrink-0"
                >
                  {{ i + 1 }}
                </span>
                <div>
                  <p class="text-sm font-medium text-nti-white">{{ doc.title }}</p>
                  <p class="text-xs text-nti-gray">{{ doc.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Životný cyklus prihlášky ───────────────────────────────────── -->
    <section class="py-20 bg-circuit-dense">
      <div class="container-nti">
        <div class="mb-12">
          <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// Workflow</p>
          <h2 class="font-display text-4xl font-bold text-nti-white mb-3">
            Stavový cyklus prihlášky
          </h2>
          <p class="text-nti-gray max-w-lg">
            Každá prihláška prechádza jasne definovanými stavmi. Hodnotenie prebieha kvartálne —
            systém otvára a uzatvára kolá hodnotenia.
          </p>
        </div>

        <div class="flex flex-wrap gap-3 mb-10">
          <div
            v-for="(s, i) in [
              { label: 'Draft prihlášky', color: 'badge-gray' },
              { label: 'Podané', color: 'badge-green' },
              { label: 'Formálne overené', color: 'badge-green' },
              {
                label: 'V hodnotení',
                color:
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20',
              },
              {
                label: 'Vyžiadané doplnenie',
                color:
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
              },
              { label: 'Schválené', color: 'badge-green' },
              {
                label: 'Zamietnuté',
                color:
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-red-500/10 text-red-400 border border-red-500/20',
              },
              { label: 'Onboarding', color: 'badge-green' },
              { label: 'Aktívny projekt', color: 'badge-green' },
              { label: 'Pozastavené', color: 'badge-gray' },
              { label: 'Ukončené / archivované', color: 'badge-gray' },
            ]"
            :key="s.label"
            class="flex items-center gap-2"
          >
            <span v-if="i > 0" class="text-nti-border text-xs">→</span>
            <span :class="s.color">{{ s.label }}</span>
          </div>
        </div>

        <!-- Process steps -->
        <div class="grid md:grid-cols-2 gap-4 max-w-3xl">
          <div
            v-for="(step, idx) in [
              {
                title: 'Registrácia a profil',
                desc: 'Vytvorte účet, doplňte profil tímu, nahrajte CV a kompetencie.',
              },
              {
                title: 'Podanie prihlášky',
                desc: 'Odošlite prihlášku s motivačným listom a povinnou dokumentáciou.',
              },
              {
                title: 'Formálna kontrola',
                desc: 'NTI overí úplnosť prihlášky a oprávnenosť uchádzačov.',
              },
              {
                title: 'Hodnotenie komisie',
                desc: 'Komisia vyhodnotí prihlášky. Prebieha kvartálne.',
              },
              {
                title: 'Priradenie mentora',
                desc: 'Schváleným projektom sa priradí mentor z praxe a spustí onboarding.',
              },
              {
                title: 'Realizácia a míľniky',
                desc: 'Evidencia míľnikov, konzultácie, dokumentácia a priebežné reporty.',
              },
            ]"
            :key="step.title"
            class="card-nti p-5 flex gap-4 items-start"
          >
            <span
              class="size-7 rounded-full bg-nti-green-dim border border-nti-green/30 flex items-center justify-center font-mono text-xs text-nti-green font-bold shrink-0"
            >
              {{ idx + 1 }}
            </span>
            <div>
              <p class="font-display font-semibold text-nti-white text-sm mb-1">{{ step.title }}</p>
              <p class="text-xs text-nti-gray leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Porovnanie so programom B ──────────────────────────────────── -->
    <section class="py-20 bg-nti-black">
      <div class="container-nti max-w-3xl">
        <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// Porovnanie</p>
        <h2 class="font-display text-3xl font-bold text-nti-white mb-8">Program A vs Program B</h2>
        <div class="card-nti overflow-hidden">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-nti-border">
                <th class="text-left p-4 text-nti-gray font-mono text-xs">Kritérium</th>
                <th class="text-left p-4 text-nti-green font-display font-semibold">
                  Program A (Grant)
                </th>
                <th class="text-left p-4 text-nti-gray-light font-display font-semibold">
                  Program B (Prax)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in [
                  ['Zdroj nápadu', 'Vlastná inovácia', 'Zadanie firmy'],
                  ['Financovanie', 'Grant NTI', 'Rozpočet firmy'],
                  ['Výstup', 'Startup / Produkt', 'Zákazkový softvér'],
                  ['Frekvencia výberu', 'Kvartálne', 'Ad hoc'],
                  ['Vedenie projektu', 'Mentor', 'Product Owner + Mentor'],
                ]"
                :key="row[0]"
                class="border-b border-nti-border last:border-0"
              >
                <td class="p-4 text-nti-gray font-mono text-xs">{{ row[0] }}</td>
                <td class="p-4 text-nti-white">{{ row[1] }}</td>
                <td class="p-4 text-nti-gray">{{ row[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-6 flex gap-4">
          <RouterLink :to="{ name: 'program-b' }" class="btn-outline text-sm">
            Zistiť viac o Programe B
            <ChevronRight class="size-4" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ── CTA ───────────────────────────────────────────────────────── -->
    <section class="py-20 bg-circuit-dense">
      <div class="container-nti text-center max-w-xl mx-auto">
        <Rocket class="size-14 text-nti-green mx-auto mb-6" />
        <h2 class="font-display text-4xl font-bold text-nti-white mb-4">Pripravený inkubovať?</h2>
        <p class="text-nti-gray text-lg mb-10 leading-relaxed">
          Zaregistruj sa, zostavte tím a odošlite prihlášku do najbližšieho kvartálneho kola
          hodnotenia.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <RouterLink :to="{ name: 'register-student' }" class="btn-primary text-base px-6 py-3">
            Registrovať sa
            <ArrowRight class="size-4" />
          </RouterLink>
          <RouterLink :to="{ name: 'challenges' }" class="btn-outline text-base px-6 py-3">
            Pozrieť výzvy
          </RouterLink>
          <RouterLink :to="{ name: 'conditions' }" class="btn-ghost text-base">
            Podmienky účasti
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
