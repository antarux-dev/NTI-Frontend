<script setup lang="ts">
interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

withDefaults(defineProps<Props>(), {
  eyebrow: undefined,
  subtitle: undefined,
  centered: false,
});
</script>

<template>
  <section class="bg-circuit pt-28 pb-20">
    <div class="container-nti" :class="{ 'text-center max-w-2xl mx-auto': centered }">
      <p
        v-if="eyebrow"
        class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3"
      >
        // {{ eyebrow }}
      </p>
      <h1 class="font-display text-5xl font-bold text-nti-white mb-4 leading-tight">
        <slot name="title">{{ title }}</slot>
      </h1>
      <p v-if="subtitle" class="text-nti-gray text-lg max-w-xl leading-relaxed">
        {{ subtitle }}
      </p>
      <div v-if="$slots.actions" class="mt-8 flex flex-wrap gap-4" :class="{ 'justify-center': centered }">
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>