<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="min-h-screen bg-circuit flex items-center justify-center px-4">
    <div class="text-center">
      <p class="font-mono text-8xl font-bold text-nti-green opacity-20 mb-4">404</p>
      <h1 class="font-display text-3xl font-bold text-nti-white mb-3">Stránka nenájdená</h1>
      <p class="text-nti-gray mb-8">Stránka, ktorú hľadáte, neexistuje alebo bola premiestnená.</p>
      <RouterLink to="/" class="btn-primary">
        Späť na domovskú stránku
      </RouterLink>
    </div>
  </div>
</template>