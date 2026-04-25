<script setup lang="ts">
  import { RouterLink } from 'vue-router';

  const footerLinks = [
    {
      title: 'Programy',
      links: [
        { label: 'Program A - Grant', to: '/program-a' },
        { label: 'Program B - Prax', to: '/program-b' },
        { label: 'Podmienky', to: '/kontakt' },
        { label: 'Výzvy', to: '/kontakt' },
      ],
    },
    {
      title: 'Pre firmy',
      links: [
        { label: 'Zadajte projekt', to: '/kontakt' },
        { label: 'Stať sa partnerom', to: '/kontakt' },
        { label: 'Mentori', to: '/o-nti' },
        { label: 'FAQ', to: '/kontakt' },
      ],
    },
    {
      title: 'O NTI',
      links: [
        { label: 'Naša misia', to: '/o-nti' },
        { label: 'Piliere', to: '/o-nti' },
        { label: 'Tím', to: '/o-nti' },
        { label: 'Novinky', to: '/' },
        { label: 'Kontakt', to: '/kontakt' },
      ],
    },
  ];
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__grid">
        <!-- Brand col -->
        <div>
          <RouterLink to="/" class="footer__logo">
            <div class="footer__logo-mark">
              <span class="footer__sq footer__sq--white"></span>
              <span class="footer__sq footer__sq--green"></span>
              <span class="footer__sq footer__sq--green"></span>
              <span class="footer__sq footer__sq--white"></span>
            </div>
            <div>
              <div class="footer__logo-name">NTI</div>
              <div class="footer__logo-sub">Nitriansky technologický inkubátor</div>
            </div>
          </RouterLink>
          <p class="footer__desc">Budujeme inovačný ekosystém v Nitrianskom regióne.</p>
        </div>

        <!-- Link cols -->
        <div v-for="col in footerLinks" :key="col.title">
          <div class="footer__col-head">{{ col.title }}</div>
          <RouterLink
            v-for="link in col.links"
            :key="link.to + link.label"
            :to="link.to"
            class="footer__link"
          >
            {{ link.label }}
          </RouterLink>
        </div>
      </div>

      <div class="footer__bottom">
        <span>© 2025 Nitriansky technologický inkubátor</span>
        <span>Vue 3 · TypeScript · Vite · Pinia</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  .footer {
    background: var(--blue);
    padding: 52px 0 32px;
    margin-top: 0;
  }

  .footer__inner {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 28px;
  }

  .footer__grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
    gap: 40px;
    margin-bottom: 44px;
  }

  .footer__logo {
    display: flex;
    align-items: center;
    gap: 11px;
    text-decoration: none;
    margin-bottom: 14px;
  }

  .footer__logo-mark {
    width: 32px;
    height: 32px;
    border: 1.5px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 4px;
    padding: 6px;
    flex-shrink: 0;
  }

  .footer__sq {
    border-radius: 2px;
    display: block;
  }

  .footer__sq--white {
    background: #fff;
  }

  .footer__sq--green {
    background: var(--green);
  }

  .footer__logo-name {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 13px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #fff;
  }

  .footer__logo-sub {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.45);
  }

  .footer__desc {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    max-width: 200px;
    line-height: 1.72;
  }

  .footer__col-head {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 14px;
  }

  .footer__link {
    display: block;
    text-decoration: none;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.65);
    margin-bottom: 9px;
    transition: color 0.18s;
  }

  .footer__link:hover {
    color: #fff;
  }

  .footer__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    padding-top: 22px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    .footer__grid {
      grid-template-columns: 1fr 1fr;
    }

    .footer__bottom {
      flex-direction: column;
      gap: 8px;
      text-align: center;
    }
  }
</style>
