<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Loader2, Calendar, ArrowRight } from 'lucide-vue-next';
import apiClient from '@/utils/http';
import type { NewsItem } from '@/types';

const news = ref<NewsItem[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const { data } = await apiClient.get<{ data: NewsItem[] }>('/news');
    news.value = data.data;
  } catch {
    // Backend not ready yet
  } finally {
    loading.value = false;
  }
});

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(dateStr),
  );
}
</script>

<template>
  <div>
    <section class="bg-circuit pt-28 pb-20">
      <div class="container-nti">
        <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// Novinky</p>
        <h1 class="font-display text-5xl font-bold text-nti-white mb-4">Novinky a aktuality</h1>
        <p class="text-nti-gray text-lg max-w-xl">Sledujte, čo sa deje v ekosystéme NTI.</p>
      </div>
    </section>

    <section class="py-20 bg-nti-black">
      <div class="container-nti">
        <div v-if="loading" class="flex justify-center py-16">
          <Loader2 class="size-8 text-nti-green animate-spin" />
        </div>

        <div v-else-if="news.length === 0" class="card-nti p-16 text-center max-w-lg mx-auto">
          <Calendar class="size-10 text-nti-muted mx-auto mb-4" />
          <p class="font-display font-semibold text-nti-white mb-2">Novinky čoskoro</p>
          <p class="text-sm text-nti-gray">
            Sekcia noviniek sa pripravuje. Sledujte nás — čoskoro pribudnú aktuálne informácie.
          </p>
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="item in news"
            :key="item.id"
            class="card-nti overflow-hidden group"
          >
            <div
              v-if="item.imageUrl"
              class="h-48 bg-nti-surface overflow-hidden"
            >
              <img
                :src="item.imageUrl"
                :alt="item.title"
                class="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
              />
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 text-xs text-nti-muted font-mono mb-3">
                <Calendar class="size-3" />
                {{ formatDate(item.publishedAt) }}
              </div>
              <h2 class="font-display font-semibold text-nti-white mb-2 group-hover:text-nti-green transition-colors">
                {{ item.title }}
              </h2>
              <p class="text-sm text-nti-gray leading-relaxed mb-4">{{ item.excerpt }}</p>
              <a href="#" class="flex items-center gap-1 text-nti-green text-sm">
                Čítať viac
                <ArrowRight class="size-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>