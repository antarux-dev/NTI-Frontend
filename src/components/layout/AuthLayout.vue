<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="bg-circuit min-h-screen flex flex-col items-center justify-center px-4 py-12">
    <!-- Logo link back home -->
    <RouterLink
      to="/"
      class="mb-8 flex items-center gap-2 transition-opacity hover:opacity-80"
      aria-label="NTI domovská stránka"
    >
      <span class="font-display text-xl font-bold text-nti-white tracking-tight">
        NTI
        <span class="text-nti-green">.</span>
      </span>
    </RouterLink>

    <!-- Auth card -->
    <div class="w-full max-w-md">
      <RouterView />
    </div>

    <!-- Back link -->
    <RouterLink to="/" class="btn-ghost mt-8 text-sm"> ← Späť na hlavnú stránku </RouterLink>
  </div>
</template>
