<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import ToastContainer from '@/components/ui/ToastContainer.vue';
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="page" mode="out-in">
      <component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
  <ToastContainer />
</template>
