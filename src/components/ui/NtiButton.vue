<script setup lang="ts">
import { computed } from 'vue';
import { Loader2 } from 'lucide-vue-next';

interface Props {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  type: 'button',
  fullWidth: false,
});

const classes = computed(() => {
  const base = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  }[props.variant];

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }[props.size];

  return [base, sizes, props.fullWidth ? 'w-full justify-center' : ''];
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="classes"
    class="inline-flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <Loader2 v-if="loading" class="size-4 animate-spin shrink-0" />
    <slot v-else name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </button>
</template>