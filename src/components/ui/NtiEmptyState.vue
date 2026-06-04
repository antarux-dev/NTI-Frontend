<script setup lang="ts">
import type { Component } from 'vue';

interface Props {
  icon?: Component;
  title: string;
  description?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="card-nti p-14 text-center">
    <div
      v-if="icon"
      class="size-14 rounded-2xl bg-nti-surface border border-nti-border flex items-center justify-center mx-auto mb-5"
    >
      <component :is="icon" class="size-7 text-nti-muted" />
    </div>
    <h3 class="font-display text-lg font-semibold text-nti-white mb-2">{{ title }}</h3>
    <p v-if="description" class="text-sm text-nti-gray max-w-sm mx-auto leading-relaxed">
      {{ description }}
    </p>
    <div v-if="$slots.actions" class="mt-6 flex justify-center gap-3">
      <slot name="actions" />
    </div>
  </div>
</template>