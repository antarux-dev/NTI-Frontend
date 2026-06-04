<script setup lang="ts">
  interface Props {
    eyebrow?: string;
    title: string;
    subtitle?: string;
  }

  defineProps<Props>();
</script>

<template>
  <div class="mb-10">
    <p v-if="eyebrow" class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">
      // {{ eyebrow }}
    </p>
    <h2 class="font-display text-3xl md:text-4xl font-bold text-nti-white mb-3">
      <slot>{{ title }}</slot>
    </h2>
    <p v-if="subtitle" class="text-nti-gray text-lg max-w-xl">{{ subtitle }}</p>
  </div>
</template>
