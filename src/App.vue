<script setup lang="ts">
  import TheNavbar from '@components/TheNavbar.vue';
  import TheFooter from '@components/TheFooter.vue';
</script>

<template>
  <TheNavbar />
  <main>
    <RouterView />
  </main>
  <TheFooter />
</template>
