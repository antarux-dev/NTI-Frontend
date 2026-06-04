<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { ChevronDown, Loader2 } from 'lucide-vue-next';
  import apiClient from '@/utils/http';
  import type { FaqItem } from '@/types';

  const faqs = ref<FaqItem[]>([]);
  const loading = ref(true);
  const openId = ref<number | null>(null);

  const placeholderFaqs: FaqItem[] = [
    {
      id: 1,
      question: 'Kto sa môže zapojiť do NTI?',
      answer:
        'Do NTI sa môže zapojiť každý aktívny študent vysokej školy na Slovensku, ako aj firmy a organizácie, ktoré chcú zadávať reálne projekty alebo sa stať partnerom.',
    },
    {
      id: 2,
      question: 'Aký je rozdiel medzi Programom A a B?',
      answer:
        'Program A je určený pre vlastné nápady — získate financovanie a mentoring pre rozvoj vlastného projektu alebo startupu. Program B prepája firemné zadania so študentskými tímami za odmenu.',
    },
    {
      id: 3,
      question: 'Ako prebieha registrácia?',
      answer:
        'Registrácia prebieha online cez portál NTI. Vyberiete typ účtu (študent alebo firma), vyplníte profil a čakáte na overenie. Po verifikácii môžete podávať prihlášky do programov.',
    },
    {
      id: 4,
      question: 'Čo je invite token pre členov firmy?',
      answer:
        'Invite token je vygenerovaný kód, ktorý firma vytvorí v NTI portáli pre svojich zamestnancov. Zamestnanec ho použije pri registrácii ako člen firmy.',
    },
    {
      id: 5,
      question: 'Ako dlho trvá hodnotenie prihlášky?',
      answer:
        'Komisia zasadá po uzavretí výzvy. Výsledky sú zvyčajne oznámené do 2–4 týždňov po deadlíne prihlášok.',
    },
  ];

  onMounted(async () => {
    try {
      const { data } = await apiClient.get<{ data: FaqItem[] }>('/faq');
      faqs.value = data.data;
    } catch {
      faqs.value = placeholderFaqs;
    } finally {
      loading.value = false;
    }
  });

  function toggle(id: number): void {
    openId.value = openId.value === id ? null : id;
  }
</script>

<template>
  <div>
    <section class="bg-circuit pt-28 pb-20">
      <div class="container-nti">
        <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// FAQ</p>
        <h1 class="font-display text-5xl font-bold text-nti-white mb-4">Časté otázky</h1>
        <p class="text-nti-gray text-lg max-w-xl">
          Odpovede na najčastejšie otázky o NTI, programoch a registrácii.
        </p>
      </div>
    </section>

    <section class="py-20 bg-nti-black">
      <div class="container-nti max-w-2xl">
        <div v-if="loading" class="flex justify-center py-16">
          <Loader2 class="size-8 text-nti-green animate-spin" />
        </div>

        <div v-else class="space-y-3">
          <div v-for="faq in faqs" :key="faq.id" class="card-nti overflow-hidden">
            <button
              class="w-full flex items-center justify-between p-5 text-left"
              :aria-expanded="openId === faq.id"
              @click="toggle(faq.id)"
            >
              <span class="font-display font-semibold text-nti-white pr-4">{{ faq.question }}</span>
              <ChevronDown
                class="size-4 text-nti-green shrink-0 transition-transform duration-200"
                :class="{ 'rotate-180': openId === faq.id }"
              />
            </button>
            <Transition name="accordion">
              <div v-if="openId === faq.id" class="px-5 pb-5">
                <hr class="divider-nti mb-4" />
                <p class="text-sm text-nti-gray leading-relaxed">{{ faq.answer }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
  .accordion-enter-active,
  .accordion-leave-active {
    transition:
      opacity 0.2s ease,
      max-height 0.25s ease;
    overflow: hidden;
    max-height: 300px;
  }

  .accordion-enter-from,
  .accordion-leave-to {
    opacity: 0;
    max-height: 0;
  }
</style>
