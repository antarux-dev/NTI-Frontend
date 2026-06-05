<script setup lang="ts">
  interface Props {
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hoverable?: boolean;
    as?: string;
  }

  withDefaults(defineProps<Props>(), {
    padding: 'md',
    hoverable: false,
    as: 'div',
  });

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  } as const;
</script>

<template>
  <component :is="as" class="card-nti" :class="[paddings[padding], hoverable && 'cursor-pointer']">
    <slot />
  </component>
</template>
