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
} from 'lucide-vue-next';
</script>

<template>
  <div>
    <!-- ── Hero Section ──────────────────────────────────────────────── -->
    <section class="bg-circuit relative min-h-screen flex items-center pt-16 overflow-hidden">
      <!-- Glow blob -->
      <div
        class="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-nti-green/5 blur-[100px]"
        aria-hidden="true"
      />

      <div class="container-nti py-24 relative">
        <div class="max-w-3xl">
          <!-- Tag -->
          <div class="badge-green mb-6 inline-flex">
            <Zap class="size-3" />
            Nitriansky technologický inkubátor
          </div>

          <!-- Headline -->
          <h1 class="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-nti-white mb-6">
            Transformujte<br />
            svoju <span class="text-gradient">budúcnosť</span>
          </h1>

          <p class="text-lg md:text-xl text-nti-gray leading-relaxed mb-10 max-w-xl">
            Zapojte sa do Nitrianského technologického inkubátora.
            Od študentského projektu k lídrovi na trhu.
          </p>

          <!-- CTAs -->
          <div class="flex flex-wrap gap-4">
            <RouterLink :to="{ name: 'register' }" class="btn-primary text-base px-6 py-3">
              Začnite teraz
              <ArrowRight class="size-4" />
            </RouterLink>
            <RouterLink :to="{ name: 'programs' }" class="btn-outline text-base px-6 py-3">
              Zistiť viac
            </RouterLink>
          </div>

          <!-- Stats -->
          <div class="flex flex-wrap gap-8 mt-14">
            <div
              v-for="stat in [
                { value: '2', label: 'Programy', suffix: '' },
                { value: '4', label: 'Piliere', suffix: '' },
                { value: '100', label: 'Audit akcií', suffix: '%' },
              ]"
              :key="stat.label"
            >
              <div class="font-display text-3xl font-bold text-nti-white">
                {{ stat.value }}<span class="text-nti-green">{{ stat.suffix }}</span>
              </div>
              <div class="text-sm text-nti-gray mt-1">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Programs Overview ───────────────────────────────────────────── -->
    <section class="py-24 bg-nti-black">
      <div class="container-nti">
        <!-- Section header -->
        <div class="mb-14">
          <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">
            // Programy
          </p>
          <h2 class="font-display text-4xl md:text-5xl font-bold text-nti-white mb-4">
            Dva cesty k úspechu
          </h2>
          <p class="text-nti-gray max-w-lg text-lg">
            Vyber si program, ktorý zodpovedá tvojim cieľom.
          </p>
        </div>

        <!-- Program cards -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Program A -->
          <RouterLink
            :to="{ name: 'program-a' }"
            class="card-nti group p-8 block"
          >
            <div class="flex items-start justify-between mb-6">
              <div class="size-12 rounded-xl bg-nti-green-dim border border-nti-green/20 flex items-center justify-center">
                <Rocket class="size-6 text-nti-green" />
              </div>
              <span class="font-mono text-xs text-nti-muted">PROGRAM-A</span>
            </div>
            <h3 class="font-display text-2xl font-bold text-nti-white mb-3 group-hover:text-nti-green transition-colors">
              Grantový inkubačný program
            </h3>
            <p class="text-nti-gray leading-relaxed mb-6">
              Vlastný inovatívny nápad → financovanie + mentoring.
              Cieľom je startup alebo produkt s medzinárodným potenciálom.
            </p>
            <div class="flex items-center gap-2 text-nti-green text-sm font-medium">
              Zistiť viac
              <ChevronRight class="size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </RouterLink>

          <!-- Program B -->
          <RouterLink
            :to="{ name: 'program-b' }"
            class="card-nti group p-8 block"
          >
            <div class="flex items-start justify-between mb-6">
              <div class="size-12 rounded-xl bg-nti-green-dim border border-nti-green/20 flex items-center justify-center">
                <Briefcase class="size-6 text-nti-green" />
              </div>
              <span class="font-mono text-xs text-nti-muted">PROGRAM-B</span>
            </div>
            <h3 class="font-display text-2xl font-bold text-nti-white mb-3 group-hover:text-nti-green transition-colors">
              Program živej praxe
            </h3>
            <p class="text-nti-gray leading-relaxed mb-6">
              Reálne zadania od firiem → prax + odmena + Product Owner.
              Zákazkový softvér a skúsenosť tímu na produkčnom projekte.
            </p>
            <div class="flex items-center gap-2 text-nti-green text-sm font-medium">
              Zistiť viac
              <ChevronRight class="size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ── Four pillars ────────────────────────────────────────────────── -->
    <section class="py-24 bg-circuit-dense">
      <div class="container-nti">
        <div class="mb-14">
          <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">
            // Strategické piliere
          </p>
          <h2 class="font-display text-4xl font-bold text-nti-white">
            Štyri piliere NTI
          </h2>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="pillar in [
              { icon: Rocket, title: 'Inkubácia', desc: 'Vznik a akcelerácia projektov, evidencia tímov, prihlášok a míľnikov.' },
              { icon: Briefcase, title: 'Partnerstvá', desc: 'Modul partnerov a firiem s registráciou, kontaktmi a výzvami.' },
              { icon: Users, title: 'Mentoring', desc: 'Priraďovanie mentorov, plánovanie konzultácií a sledovanie progresu.' },
              { icon: Star, title: 'Retencia', desc: 'Budovanie komunity, profily absolventov a úspešných príbehov.' },
            ]"
            :key="pillar.title"
            class="card-nti p-6"
          >
            <component :is="pillar.icon" class="size-8 text-nti-green mb-4" />
            <h3 class="font-display text-lg font-semibold text-nti-white mb-2">
              {{ pillar.title }}
            </h3>
            <p class="text-sm text-nti-gray leading-relaxed">{{ pillar.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Registration CTA ────────────────────────────────────────────── -->
    <section class="py-24 bg-nti-black">
      <div class="container-nti">
        <div class="card-nti p-12 text-center max-w-2xl mx-auto">
          <div class="badge-green mx-auto mb-6 inline-flex">
            Zaregistruj sa ešte dnes
          </div>
          <h2 class="font-display text-4xl font-bold text-nti-white mb-4">
            Pripravený začať?
          </h2>
          <p class="text-nti-gray mb-8 text-lg">
            Registruj sa ako študent alebo firma a staň sa súčasťou ekosystému NTI.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <RouterLink :to="{ name: 'register-student' }" class="btn-primary">
              Som študent
              <ArrowRight class="size-4" />
            </RouterLink>
            <RouterLink :to="{ name: 'register-company' }" class="btn-outline">
              Som firma
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>