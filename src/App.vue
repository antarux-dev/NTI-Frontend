<script setup lang="ts">
import TheNavbar from '../src/components/TheNavbar.vue'
import TheFooter from '../src/components/TheFooter.vue'
</script>

<template>
  <TheNavbar />
  <main>
    <RouterView />
  </main>
  <TheFooter />
</template>
