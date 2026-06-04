<script setup lang="ts">
interface Props {
  variant?: 'green' | 'gray' | 'red' | 'yellow';
}

withDefaults(defineProps<Props>(), {
  variant: 'gray',
});

const variantClass = {
  green: 'badge-green',
  gray: 'badge-gray',
  red: 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium font-mono bg-red-500/10 text-red-400 border border-red-500/20',
  yellow:
    'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
} as const;
</script>

<template>
  <span :class="variantClass[variant]">
    <slot />
  </span>
</template>