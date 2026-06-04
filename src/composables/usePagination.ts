import { ref, computed } from 'vue';

export function usePagination(initialPage = 1) {
  const currentPage = ref(initialPage);
  const lastPage = ref(1);
  const perPage = ref(15);
  const total = ref(0);

  const hasNextPage = computed(() => currentPage.value < lastPage.value);
  const hasPrevPage = computed(() => currentPage.value > 1);

  function nextPage(): void {
    if (hasNextPage.value) currentPage.value++;
  }

  function prevPage(): void {
    if (hasPrevPage.value) currentPage.value--;
  }

  function goToPage(page: number): void {
    if (page >= 1 && page <= lastPage.value) {
      currentPage.value = page;
    }
  }

  function setMeta(meta: { currentPage: number; lastPage: number; perPage: number; total: number }): void {
    currentPage.value = meta.currentPage;
    lastPage.value = meta.lastPage;
    perPage.value = meta.perPage;
    total.value = meta.total;
  }

  return {
    currentPage,
    lastPage,
    perPage,
    total,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    goToPage,
    setMeta,
  };
}