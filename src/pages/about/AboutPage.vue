<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { ArrowRight, Rocket, Briefcase, Users, Star, Globe, ChevronRight } from 'lucide-vue-next';
</script>

<template>
  <div>
    <section class="bg-circuit pt-28 pb-20">
      <div class="container-nti max-w-2xl">
        <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// O NTI</p>
        <h1 class="font-display text-5xl font-bold text-nti-white mb-5 leading-tight">
          Nitriansky technologický inkubátor
        </h1>
        <p class="text-nti-gray text-xl leading-relaxed italic mb-2">
          "Od študentského projektu k lídrovi na trhu."
        </p>
        <p class="text-nti-gray text-lg leading-relaxed">
          NTI je centrálna platforma pre vznik, inkubáciu a akceleráciu technologických projektov a
          startupov v Nitrianskom regióne.
        </p>
      </div>
    </section>

    <!-- Prečo NTI vzniklo -->
    <section class="py-20 bg-nti-black">
      <div class="container-nti max-w-3xl">
        <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">
          // Vznik a kontext
        </p>
        <h2 class="font-display text-3xl font-bold text-nti-white mb-6">Prečo NTI vzniklo</h2>
        <div class="space-y-4 text-nti-gray leading-relaxed">
          <p>
            NTI vzniká ako odpoveď na odliv technologických talentov z regiónu, potrebu rozvoja
            podnikateľského myslenia medzi študentmi a absenciu systematickej podpory inovatívnych
            projektov na pôde Fakulty prírodných vied a informatiky UKF v Nitre.
          </p>
          <p>
            Strategickým cieľom je vytvárať nové projekty, startupy a profesionálne IT tímy s
            medzinárodným potenciálom — a budovať ekosystém, ktorý prepája akademickú sféru s
            reálnymi potrebami súkromného sektora.
          </p>
          <p>
            Systém NTI nie je iba marketingová webstránka. Je to plnohodnotná procesná platforma
            kombinujúca marketing, intake, workflow a reporting — od prvého kontaktu návštevníka až
            po archiváciu výsledkov projektu a sledovanie absolventov.
          </p>
        </div>
      </div>
    </section>

    <!-- Štyri piliere -->
    <section class="py-20 bg-circuit-dense">
      <div class="container-nti">
        <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">
          // Strategické piliere
        </p>
        <h2 class="font-display text-4xl font-bold text-nti-white mb-10">Štyri piliere NTI</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="p in [
              {
                icon: Rocket,
                title: 'Inkubácia',
                desc: 'Vznik a akcelerácia projektov — evidencia tímov, prihlášok, míľnikov a výstupov. Grantová podpora a mentoring.',
              },
              {
                icon: Briefcase,
                title: 'Partnerstvá',
                desc: 'Modul firiem a partnerov — registrácia, kontakty, výzvy, zadávania a spoluprác. Program B ako firemný vstupný bod.',
              },
              {
                icon: Users,
                title: 'Mentoring',
                desc: 'Priraďovanie mentorov k projektom, plánovanie konzultácií, záznamy spätnej väzby a sledovanie progresu.',
              },
              {
                icon: Star,
                title: 'Retencia',
                desc: 'Budovanie komunity absolventov, profilov úspešných projektov a dlhodobej väzby talentov na región.',
              },
            ]"
            :key="p.title"
            class="card-nti p-6"
          >
            <div
              class="size-12 rounded-2xl bg-nti-green-dim border border-nti-green/20 flex items-center justify-center mb-5"
            >
              <component :is="p.icon" class="size-6 text-nti-green" />
            </div>
            <h3 class="font-display font-semibold text-nti-white mb-2">{{ p.title }}</h3>
            <p class="text-sm text-nti-gray leading-relaxed">{{ p.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Ekosystém -->
    <section class="py-20 bg-nti-black">
      <div class="container-nti">
        <div class="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">
              // Ekosystém
            </p>
            <h2 class="font-display text-4xl font-bold text-nti-white mb-5">
              Ekosystém budúcnosti
            </h2>
            <p class="text-nti-gray leading-relaxed mb-6">
              NTI buduje uzavretý ekosystém prepájajúci štyri kľúčové prvky Nitrianskeho regiónu.
            </p>
            <div class="space-y-3">
              <div
                v-for="item in [
                  {
                    title: 'Študenti a talenty',
                    desc: 'Motivovaní vývojári, dizajnéri a podnikatelia z UKF a okolia.',
                  },
                  {
                    title: 'Inkubátor NTI (Programy A & B)',
                    desc: 'Centrálna platforma pre registrácie, prihlášky, hodnotenie a mentoring.',
                  },
                  {
                    title: 'Nové startupy a tímy',
                    desc: 'Výstupy programov — produkty, startupy a profesionálne IT tímy.',
                  },
                  {
                    title: 'Regionálne technologické centrum',
                    desc: 'Dlhodobý cieľ — transformácia Nitrianskeho regiónu na inovačné centrum.',
                  },
                ]"
                :key="item.title"
                class="card-nti p-4 flex gap-3 items-start"
              >
                <span class="size-1.5 rounded-full bg-nti-green shrink-0 mt-2" />
                <div>
                  <p class="text-sm font-semibold text-nti-white">{{ item.title }}</p>
                  <p class="text-xs text-nti-gray">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Inštitúcia -->
          <div class="card-nti p-8">
            <Globe class="size-8 text-nti-green mb-5" />
            <h3 class="font-display text-xl font-bold text-nti-white mb-2">
              Fakulta prírodných vied a informatiky
            </h3>
            <p class="text-sm text-nti-green font-mono mb-4">
              Univerzita Konštantína Filozofa v Nitre
            </p>
            <p class="text-nti-gray text-sm leading-relaxed mb-6">
              NTI je zastrešené FPVaI UKF — jednou z popredných fakúlt informatiky na Slovensku.
              Systém kombinuje prezentačný web, registračný portál a procesný workflow pre komplexnú
              správu celého životného cyklu programu.
            </p>
            <div class="space-y-2 text-sm text-nti-gray font-mono mb-6">
              <p>Tr. A. Hlinku 1, 949 74 Nitra</p>
              <a
                href="https://www.fpvai.ukf.sk"
                target="_blank"
                class="text-nti-green hover:underline block"
              >
                www.fpvai.ukf.sk
              </a>
            </div>
            <hr class="divider-nti mb-4" />
            <p class="font-mono text-xs text-nti-muted">
              Technická špecifikácia v. 1.0 · 03.03.2026 · Architekt: D. Halvoník
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Nav links -->
    <section class="py-16 bg-circuit-dense">
      <div class="container-nti">
        <div class="grid sm:grid-cols-3 gap-4 max-w-2xl">
          <RouterLink
            v-for="link in [
              { label: 'Naša misia', desc: 'Hodnoty a dlhodobé ciele', to: { name: 'mission' } },
              { label: 'Kontakt', desc: 'Napíšte nám alebo navštívte', to: { name: 'contact' } },
              { label: 'FAQ', desc: 'Odpovede na časté otázky', to: { name: 'faq' } },
            ]"
            :key="link.label"
            :to="link.to"
            class="card-nti group p-5 block"
          >
            <p
              class="font-display font-semibold text-nti-white group-hover:text-nti-green transition-colors mb-0.5"
            >
              {{ link.label }}
            </p>
            <p class="text-xs text-nti-gray">{{ link.desc }}</p>
          </RouterLink>
        </div>
        <div class="mt-8 flex flex-wrap gap-4">
          <RouterLink :to="{ name: 'register-student' }" class="btn-primary">
            Zapojiť sa
            <ArrowRight class="size-4" />
          </RouterLink>
          <RouterLink :to="{ name: 'programs' }" class="btn-outline"> Pozrieť programy </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
