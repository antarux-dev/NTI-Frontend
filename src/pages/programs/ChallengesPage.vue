<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { RouterLink } from 'vue-router';
  import { Calendar, Clock, ArrowRight, Loader2 } from 'lucide-vue-next';
  import apiClient from '@/utils/http';
  import type { Call } from '@/types';

  const calls = ref<Call[]>([]);
  const loading = ref(true);

  // Placeholder data until backend is ready
  const placeholderCalls: Call[] = [
    {
      id: 1,
      programId: 1,
      title: 'Výzva 2025/I — Program A',
      description:
        'Otvorená výzva pre inovatívne projekty v oblasti webových aplikácií, IoT a hier.',
      status: 'open',
      deadline: '2025-06-30',
      evaluationCriteria: ['Inovácia', 'Realizovateľnosť', 'Dopad', 'Tím'],
    },
    {
      id: 2,
      programId: 2,
      title: 'Výzva 2025/B — Firemné projekty',
      description:
        'Program B — zbierka firemných zadaní pre študentské tímy na akademický rok 2025/26.',
      status: 'open',
      deadline: '2025-09-15',
      evaluationCriteria: ['Technická schopnosť', 'Motivácia', 'Návrh riešenia'],
    },
  ];

  onMounted(async () => {
    try {
      const { data } = await apiClient.get<{ data: Call[] }>('/calls');
      calls.value = data.data;
    } catch {
      // Backend not ready yet — use placeholder
      calls.value = placeholderCalls;
    } finally {
      loading.value = false;
    }
  });

  function formatDate(dateStr: string): string {
    return new Intl.DateTimeFormat('sk-SK', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateStr));
  }

  const statusLabels: Record<string, string> = {
    open: 'Otvorená',
    closed: 'Uzavretá',
    evaluating: 'Hodnotenie',
    finished: 'Ukončená',
    draft: 'Draft',
  };

  const statusClasses: Record<string, string> = {
    open: 'badge-green',
    closed: 'badge-gray',
    evaluating: 'badge-gray',
    finished: 'badge-gray',
    draft: 'badge-gray',
  };
</script>

<template>
  <div>
    <section class="bg-circuit pt-28 pb-20">
      <div class="container-nti">
        <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// Výzvy</p>
        <h1 class="font-display text-5xl font-bold text-nti-white mb-4">Aktívne výzvy</h1>
        <p class="text-nti-gray text-lg max-w-xl">
          Prehľad aktuálnych otvorených kôl a dôležitých termínov.
        </p>
      </div>
    </section>

    <section class="py-20 bg-nti-black">
      <div class="container-nti">
        <div v-if="loading" class="flex justify-center py-16">
          <Loader2 class="size-8 text-nti-green animate-spin" />
        </div>

        <div v-else class="space-y-5">
          <div v-for="call in calls" :key="call.id" class="card-nti p-7">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <span :class="statusClasses[call.status] ?? 'badge-gray'">
                    {{ statusLabels[call.status] ?? call.status }}
                  </span>
                  <span class="font-mono text-xs text-nti-muted">
                    PROGRAM-{{ call.programId === 1 ? 'A' : 'B' }}
                  </span>
                </div>
                <h2 class="font-display text-xl font-bold text-nti-white">{{ call.title }}</h2>
              </div>
              <div class="flex items-center gap-2 text-sm text-nti-gray shrink-0">
                <Clock class="size-4 text-nti-green" />
                <span
                  >Deadline:
                  <strong class="text-nti-white">{{ formatDate(call.deadline) }}</strong></span
                >
              </div>
            </div>

            <p class="text-nti-gray leading-relaxed mb-5">{{ call.description }}</p>

            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="criterion in call.evaluationCriteria"
                :key="criterion"
                class="badge-gray"
              >
                {{ criterion }}
              </span>
            </div>

            <RouterLink
              v-if="call.status === 'open'"
              :to="{ name: 'register' }"
              class="btn-primary"
            >
              Prihlásiť sa
              <ArrowRight class="size-4" />
            </RouterLink>
          </div>

          <div v-if="calls.length === 0" class="card-nti p-12 text-center">
            <Calendar class="size-10 text-nti-muted mx-auto mb-4" />
            <p class="text-nti-gray">Momentálne nie sú aktívne žiadne výzvy.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
