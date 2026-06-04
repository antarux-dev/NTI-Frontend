<script setup lang="ts">
  import { RouterLink } from 'vue-router';

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Programy',
      items: [
        { label: 'Program A', to: '/programy/program-a' },
        { label: 'Program B', to: '/programy/program-b' },
        { label: 'Výzvy', to: '/programy/vyzvy' },
        { label: 'Podmienky', to: '/programy/podmienky' },
      ],
    },
    {
      title: 'Pre firmy',
      items: [
        { label: 'Ako fungujú projekty', to: '/pre-firmy/ako-funguju-projekty' },
        { label: 'Partneri', to: '/pre-firmy/partneri' },
        { label: 'Mentori', to: '/pre-firmy/mentori' },
      ],
    },
    {
      title: 'O NTI',
      items: [
        { label: 'Naša misia', to: '/o-nti/nasa-misia' },
        { label: 'FAQ', to: '/o-nti/faq' },
        { label: 'Novinky', to: '/o-nti/novinky' },
        { label: 'Kontakt', to: '/o-nti/kontakt' },
      ],
    },
    {
      title: 'Portál',
      items: [
        { label: 'Prihlásenie', to: '/auth/prihlasenie' },
        { label: 'Registrácia', to: '/auth/registracia' },
      ],
    },
  ];
</script>

<template>
  <footer class="bg-nti-dark border-t border-nti-border">
    <div class="container-nti py-12">
      <!-- Top section -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
        <!-- Brand col -->
        <div class="md:col-span-1">
          <RouterLink to="/" class="inline-block mb-4">
            <span class="font-display text-2xl font-bold text-nti-white">
              NTI<span class="text-nti-green">.</span>
            </span>
          </RouterLink>
          <p class="text-sm text-nti-gray leading-relaxed max-w-xs">
            Nitriansky technologický inkubátor. Od študentského projektu k lídrovi na trhu.
          </p>
          <p class="mt-3 text-xs text-nti-muted font-mono">
            Fakulta prírodných vied a informatiky<br />
            UKF Nitra, Tr. A. Hlinku 1
          </p>
        </div>

        <!-- Nav cols -->
        <div v-for="section in footerLinks" :key="section.title" class="md:col-span-1">
          <h3
            class="font-display text-xs font-semibold uppercase tracking-widest text-nti-gray-light mb-4"
          >
            {{ section.title }}
          </h3>
          <ul class="space-y-2">
            <li v-for="item in section.items" :key="item.label">
              <RouterLink
                :to="item.to"
                class="text-sm text-nti-gray hover:text-nti-white transition-colors"
              >
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <hr class="divider-nti mb-6" />

      <!-- Bottom bar -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-nti-muted">
          © {{ currentYear }} Nitriansky technologický inkubátor. Všetky práva vyhradené.
        </p>
        <div class="flex items-center gap-4 text-xs text-nti-muted">
          <a href="#" class="hover:text-nti-gray transition-colors">Ochrana súkromia</a>
          <span class="text-nti-border">·</span>
          <a href="#" class="hover:text-nti-gray transition-colors">Podmienky použitia</a>
        </div>
      </div>
    </div>
  </footer>
</template>
