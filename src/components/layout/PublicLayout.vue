<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import TheNavbar from '@/components/layout/TheNavbar.vue';
  import TheFooter from '@/components/layout/TheFooter.vue';
</script>

<template>
  <div class="flex min-h-screen flex-col bg-nti-black">
    <TheNavbar />
    <main class="flex-1">
      <RouterView />
    </main>
    <TheFooter />
  </div>
</template>
