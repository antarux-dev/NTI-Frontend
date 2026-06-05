<script setup lang="ts">
  import { computed } from 'vue';
  import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

  interface Props {
    currentPage: number;
    lastPage: number;
    total?: number;
    perPage?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    total: undefined,
    perPage: 15,
  });

  const emit = defineEmits<{ change: [page: number] }>();

  // Generate visible page numbers with ellipsis
  const pages = computed(() => {
    const range: (number | '...')[] = [];
    const delta = 2;
    const left = props.currentPage - delta;
    const right = props.currentPage + delta;

    for (let i = 1; i <= props.lastPage; i++) {
      if (i === 1 || i === props.lastPage || (i >= left && i <= right)) {
        range.push(i);
      } else if (range[range.length - 1] !== '...') {
        range.push('...');
      }
    }
    return range;
  });
</script>

<template>
  <div v-if="lastPage > 1" class="flex items-center justify-between gap-4">
    <!-- Info -->
    <p v-if="total !== undefined" class="text-xs text-nti-muted font-mono hidden sm:block">
      Celkom {{ total }} záznamov
    </p>
    <div v-else />

    <!-- Pages -->
    <div class="flex items-center gap-1">
      <!-- Prev -->
      <button
        class="size-8 rounded-lg flex items-center justify-center text-nti-gray hover:text-nti-white hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        :disabled="currentPage <= 1"
        aria-label="Predchádzajúca strana"
        @click="emit('change', currentPage - 1)"
      >
        <ChevronLeft class="size-4" />
      </button>

      <!-- Page numbers -->
      <template v-for="page in pages" :key="page">
        <span
          v-if="page === '...'"
          class="size-8 flex items-center justify-center text-nti-muted text-xs"
        >
          …
        </span>
        <button
          v-else
          class="size-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors"
          :class="
            page === currentPage
              ? 'bg-nti-green text-nti-black font-bold'
              : 'text-nti-gray hover:text-nti-white hover:bg-white/5'
          "
          @click="emit('change', page)"
        >
          {{ page }}
        </button>
      </template>

      <!-- Next -->
      <button
        class="size-8 rounded-lg flex items-center justify-center text-nti-gray hover:text-nti-white hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        :disabled="currentPage >= lastPage"
        aria-label="Ďalšia strana"
        @click="emit('change', currentPage + 1)"
      >
        <ChevronRight class="size-4" />
      </button>
    </div>
  </div>
</template>
