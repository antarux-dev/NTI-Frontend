<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useNtiStore } from "@/stores/nti";
import ProgramCard from "@/components/ProgramCard.vue";

const store = useNtiStore();
</script>

<template>
  <!-- HERO -->
  <section class="hero">
    <div class="wrap">
      <div class="hero__layout">
        <div class="hero__content">
          <div class="hero__pill">
            <span class="hero__dot"></span>
            Výzva 2025 je otvorená
          </div>
          <h1 class="hero__title">
            Miesto, kde nápady<br />dostávajú <em>tvar</em>
          </h1>
          <p class="hero__sub">
            Nitriansky technologický inkubátor prepája študentov s ambíciami,
            firmy s reálnymi zadaniami a mentorov so skúsenosťami — aby z
            regionálnych talentov vznikali projekty s dosahom.
          </p>
          <div class="hero__actions">
            <RouterLink to="/program-a" class="btn btn--green">
              Prezerať programy
            </RouterLink>
            <RouterLink to="/o-nti" class="btn btn--ghost">
              Zistiť viac o NTI
            </RouterLink>
          </div>
        </div>

        <div class="hero__card">
          <div class="hero__card-label">NTI v číslach</div>
          <div class="hero__stats">
            <div v-for="stat in store.stats" :key="stat.label" class="stat-box">
              <div class="stat-box__num">{{ stat.val }}</div>
              <div class="stat-box__label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PROGRAMS -->
  <section id="programy" class="section">
    <div class="wrap">
      <div class="section__header">
        <div class="section__label">Programy</div>
        <h2 class="section__title">Vyber si svoju cestu</h2>
        <p class="section__sub">
          Dva rôzne vstupy — rovnaký cieľ: rásť, tvoriť a získať reálnu
          skúsenosť.
        </p>
      </div>

      <div class="programs-grid">
        <ProgramCard
          v-for="prog in store.programs"
          :key="prog.id"
          :program="prog"
        />
      </div>
    </div>
  </section>

  <hr class="divider" />

  <!-- PILLARS -->
  <section id="o-nti" class="section">
    <div class="wrap">
      <div class="section__header">
        <div class="section__label">Ekosystém</div>
        <h2 class="section__title">Štyri piliere NTI</h2>
      </div>
      <div class="pillars">
        <div v-for="pillar in store.pillars" :key="pillar.name" class="pillar">
          <div class="pillar__icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                :d="pillar.svgPath"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h4 class="pillar__name">{{ pillar.name }}</h4>
          <p class="pillar__desc">{{ pillar.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <hr class="divider" />

  <!-- HOW IT WORKS -->
  <section class="section">
    <div class="wrap">
      <div class="steps-layout">
        <div>
          <div class="section__label">Ako to funguje</div>
          <h2 class="section__title">Od registrácie<br />po výsledok</h2>
          <p class="section__sub">
            Jednoduchý proces, kde každý krok má jasný výstup a ty vždy vieš,
            kde sa nachádzaš.
          </p>
        </div>
        <div class="steps">
          <div v-for="(step, i) in store.steps" :key="step.title" class="step">
            <div class="step__num">0{{ i + 1 }}</div>
            <div>
              <h4 class="step__title">{{ step.title }}</h4>
              <p class="step__desc">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <hr class="divider" />

  <!-- FOR COMPANIES -->
  <section id="firmy" class="section">
    <div class="wrap">
      <div class="company-layout">
        <div>
          <div class="section__label">Pre firmy a partnerov</div>
          <h2 class="section__title">Zadajte projekt.<br />Získajte tím.</h2>
          <p class="section__sub" style="margin-bottom: 32px">
            Cez Program B môžete zadať reálnu výzvu a spolupracovať so zvoleným
            tímom — s vaším Product Ownerom a NTI mentorom.
          </p>
          <div class="benefits">
            <div class="benefit">
              <span class="benefit__dot"></span>
              <div>
                <div class="benefit__title">Prístup k talentom</div>
                <div class="benefit__desc">
                  Spolupracujte s motivovanými IT študentmi na reálnych
                  zadaniach.
                </div>
              </div>
            </div>
            <div class="benefit">
              <span class="benefit__dot"></span>
              <div>
                <div class="benefit__title">Vlastný softvér</div>
                <div class="benefit__desc">
                  Výstupom je zákazkový softvér odovzdaný podľa vašej
                  špecifikácie.
                </div>
              </div>
            </div>
            <div class="benefit">
              <span class="benefit__dot"></span>
              <div>
                <div class="benefit__title">NTI ako sprostredkovateľ</div>
                <div class="benefit__desc">
                  Celý proces riadi NTI vrátane výberu tímu a mentoringu.
                </div>
              </div>
            </div>
          </div>
          <RouterLink
            to="/kontakt"
            class="btn btn--green"
            style="margin-top: 8px"
          >
            Mám záujem spolupracovať
          </RouterLink>
        </div>
        <div>
          <div class="section__label">Proces vstupu firmy</div>
          <div class="steps" style="margin-top: 16px">
            <div
              v-for="(step, i) in [
                'Registrácia firemného profilu',
                'Zadanie technickej špecifikácie a rozpočtu',
                'Definovanie Product Ownera',
                'Výber tímu spolu s komisiou',
                'Schválenie výsledku a uzavretie projektu',
              ]"
              :key="step"
              class="step"
            >
              <div class="step__num">0{{ i + 1 }}</div>
              <div>
                <h4 class="step__title" style="font-size: 16px">{{ step }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <hr class="divider" />

  <!-- PARTNERS -->
  <section id="partneri" class="section">
    <div class="wrap">
      <div class="section__label">Partneri</div>
      <h2 class="section__title">Silná sieť partnerstva</h2>
      <p class="section__sub">
        Spolupracujeme s firmami, univerzitami a inštitúciami, ktoré zdieľajú
        naše hodnoty.
      </p>
      <div class="partners">
        <span
          v-for="partner in store.partners"
          :key="partner.name"
          class="partner-chip"
        >
          {{ partner.name }}
        </span>
      </div>
      <RouterLink
        to="/kontakt"
        class="btn--ghost-line"
        style="margin-top: 28px; display: inline-block"
      >
        Staňte sa partnerom NTI
      </RouterLink>
    </div>
  </section>

  <!-- CTA -->
  <div id="kontakt" class="wrap" style="padding-bottom: 88px">
    <div class="cta-band">
      <h2 class="cta-band__title">
        Tvoj projekt začína<br />jednou <em>registráciou</em>
      </h2>
      <p class="cta-band__sub">
        Registruj sa ako študent, tím alebo firma — a vstup do inkubačného
        procesu NTI.
      </p>
      <div class="cta-band__actions">
        <RouterLink to="/kontakt" class="btn btn--white">
          Registrovať ako študent
        </RouterLink>
        <RouterLink to="/kontakt" class="btn btn--outline-w">
          Registrovať ako firma
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── wrap ── */
.wrap {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 28px;
}

.divider {
  border: none;
  border-top: 1px solid var(--gray-20);
}

/* ── HERO ── */
.hero {
  padding: 136px 0 96px;
  border-bottom: 1px solid var(--gray-20);
}

.hero__layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 64px;
  align-items: center;
}

.hero__pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: var(--green-l);
  border: 1px solid var(--green-m);
  color: var(--green-d);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 4px;
  margin-bottom: 28px;
}

.hero__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green);
  display: inline-block;
}

.hero__title {
  font-size: clamp(38px, 5.2vw, 66px);
  line-height: 1.08;
  letter-spacing: -0.025em;
  color: var(--blue);
  margin-bottom: 22px;
}

.hero__title em {
  font-style: italic;
  color: var(--green);
}

.hero__sub {
  font-size: 16px;
  color: var(--gray-70);
  line-height: 1.75;
  max-width: 500px;
  margin-bottom: 38px;
}

.hero__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.hero__card {
  background: var(--gray-10);
  border: 1px solid var(--gray-20);
  border-radius: 12px;
  padding: 28px;
}

.hero__card-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gray-50);
  margin-bottom: 18px;
}

.hero__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-box {
  background: #fff;
  border: 1px solid var(--gray-20);
  border-radius: 8px;
  padding: 16px;
}

.stat-box__num {
  font-family: "Fraunces", serif;
  font-size: 30px;
  font-weight: 300;
  color: var(--blue);
  line-height: 1;
  margin-bottom: 4px;
}

.stat-box__label {
  font-size: 12px;
  color: var(--gray-50);
}

/* ── buttons ── */
.btn {
  display: inline-block;
  font-family: "DM Sans", sans-serif;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 26px;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.18s;
}

.btn--green {
  background: var(--green);
  color: #fff;
}

.btn--green:hover {
  background: var(--green-d);
}

.btn--ghost {
  color: var(--gray-50);
  border-bottom: 1px solid var(--gray-30);
  padding-left: 0;
  padding-right: 0;
  border-radius: 0;
}

.btn--ghost:hover {
  color: var(--blue);
  border-color: var(--blue-m);
}

.btn--white {
  background: #fff;
  color: var(--blue);
}

.btn--white:hover {
  background: var(--blue-l);
}

.btn--outline-w {
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.btn--outline-w:hover {
  border-color: rgba(255, 255, 255, 0.8);
  color: #fff;
}

.btn--ghost-line {
  color: var(--gray-50);
  font-size: 14px;
  text-decoration: none;
  border-bottom: 1px solid var(--gray-30);
  padding-bottom: 1px;
  transition:
    color 0.18s,
    border-color 0.18s;
}

.btn--ghost-line:hover {
  color: var(--blue);
  border-color: var(--blue-m);
}

/* ── section ── */
.section {
  padding: 88px 0;
}

.section__header {
  margin-bottom: 44px;
}

.section__label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 14px;
}

.section__title {
  font-size: clamp(26px, 3.6vw, 44px);
  line-height: 1.14;
  color: var(--blue);
  margin-bottom: 14px;
}

.section__sub {
  font-size: 15px;
  color: var(--gray-70);
  line-height: 1.72;
  max-width: 460px;
}

/* ── programs grid ── */
.programs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid var(--gray-20);
  border-radius: 12px;
  overflow: hidden;
}

/* ── pillars ── */
.pillars {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--gray-20);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 44px;
}

.pillar {
  padding: 28px 24px;
  background: #fff;
}

.pillar + .pillar {
  border-left: 1px solid var(--gray-20);
}

.pillar__icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: var(--green-l);
  border: 1px solid var(--green-m);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}

.pillar__icon svg {
  width: 16px;
  height: 16px;
  color: var(--green);
}

.pillar__name {
  font-size: 17px;
  margin-bottom: 7px;
  color: var(--blue);
}

.pillar__desc {
  font-size: 13px;
  color: var(--gray-70);
  line-height: 1.65;
}

/* ── steps ── */
.steps-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

.steps {
  margin-top: 0;
}

.step {
  display: grid;
  grid-template-columns: 38px 1fr;
  gap: 16px;
  padding: 22px 0;
  border-bottom: 1px solid var(--gray-20);
}

.step:first-child {
  border-top: 1px solid var(--gray-20);
}

.step__num {
  font-family: "Fraunces", serif;
  font-size: 13px;
  font-style: italic;
  color: var(--green);
  padding-top: 2px;
}

.step__title {
  font-size: 19px;
  margin-bottom: 5px;
  color: var(--blue);
}

.step__desc {
  font-size: 13px;
  color: var(--gray-70);
  line-height: 1.68;
}

/* ── company ── */
.company-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

.benefits {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.benefit {
  display: flex;
  gap: 14px;
  margin-bottom: 22px;
  align-items: flex-start;
}

.benefit__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--green);
  flex-shrink: 0;
  margin-top: 5px;
  display: block;
}

.benefit__title {
  font-size: 15px;
  font-weight: 500;
  color: var(--gray-90);
  margin-bottom: 3px;
}

.benefit__desc {
  font-size: 13px;
  color: var(--gray-70);
  line-height: 1.65;
}

/* ── partners ── */
.partners {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 32px;
}

.partner-chip {
  background: var(--gray-10);
  border: 1px solid var(--gray-20);
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 13px;
  color: var(--gray-50);
  transition:
    border-color 0.18s,
    color 0.18s;
  cursor: default;
}

.partner-chip:hover {
  border-color: var(--green-m);
  color: var(--green-d);
}

/* ── CTA band ── */
.cta-band {
  background: var(--green);
  border-radius: 12px;
  padding: 64px;
  text-align: center;
}

.cta-band__title {
  color: #fff;
  font-size: clamp(24px, 3.5vw, 42px);
  margin-bottom: 14px;
}

.cta-band__title em {
  font-style: italic;
  color: var(--blue-l);
}

.cta-band__sub {
  color: rgba(255, 255, 255, 0.78);
  font-size: 15px;
  max-width: 420px;
  margin: 0 auto 32px;
  line-height: 1.7;
}

.cta-band__actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

/* ── responsive ── */
@media (max-width: 900px) {
  .hero__layout {
    grid-template-columns: 1fr;
  }

  .hero__card {
    display: none;
  }

  .programs-grid {
    grid-template-columns: 1fr;
  }

  .pillars {
    grid-template-columns: 1fr 1fr;
  }

  .pillar + .pillar {
    border-left: none;
  }

  .pillar:nth-child(odd) {
    border-right: 1px solid var(--gray-20);
  }

  .pillar:nth-child(n + 3) {
    border-top: 1px solid var(--gray-20);
  }

  .steps-layout,
  .company-layout {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .cta-band {
    padding: 40px 24px;
  }
}
</style>
