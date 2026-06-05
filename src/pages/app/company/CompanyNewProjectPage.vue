<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { useForm } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/zod';
  import { z } from 'zod';
  import { Loader2, ArrowLeft, CheckCircle, Plus, X } from 'lucide-vue-next';
  import NtiAlert from '@/components/ui/NtiAlert.vue';

  const success = ref(false);
  const serverError = ref<string | null>(null);
  const tagInput = ref('');
  const tags = ref<string[]>([]);

  const schema = z.object({
    title: z.string().min(5, 'Názov projektu je povinný'),
    description: z.string().min(20, 'Popis musí mať aspoň 20 znakov'),
    techStack: z.string().min(3, 'Zadajte požadované technológie'),
    teamSize: z.coerce.number().int().min(1).max(10),
    budget: z.string().optional(),
    deadline: z.string().min(1, 'Deadline je povinný'),
    productOwner: z.string().min(2, 'Meno Product Ownera je povinné'),
    poEmail: z.string().email('Zadajte platný e-mail Product Ownera'),
  });

  const { handleSubmit, errors, defineField, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues: { teamSize: 3 },
  });

  const [title, titleAttrs] = defineField('title');
  const [description, descriptionAttrs] = defineField('description');
  const [techStack, techStackAttrs] = defineField('techStack');
  const [teamSize, teamSizeAttrs] = defineField('teamSize');
  const [budget, budgetAttrs] = defineField('budget');
  const [deadline, deadlineAttrs] = defineField('deadline');
  const [productOwner, productOwnerAttrs] = defineField('productOwner');
  const [poEmail, poEmailAttrs] = defineField('poEmail');

  function addTag(): void {
    const t = tagInput.value.trim();
    if (t && !tags.value.includes(t)) tags.value.push(t);
    tagInput.value = '';
  }

  function removeTag(tag: string): void {
    tags.value = tags.value.filter((t) => t !== tag);
  }

  const onSubmit = handleSubmit(async (_values) => {
    serverError.value = null;
    try {
      // TODO: call API when backend is ready
      await new Promise((r) => setTimeout(r, 800));
      success.value = true;
    } catch (err: unknown) {
      serverError.value = err instanceof Error ? err.message : 'Nastala chyba. Skúste to znova.';
    }
  });
</script>

<template>
  <div class="max-w-2xl">
    <RouterLink :to="{ name: 'company-projects' }" class="btn-ghost text-sm mb-6 inline-flex">
      <ArrowLeft class="size-4" /> Späť na projekty
    </RouterLink>

    <!-- Success -->
    <div v-if="success" class="card-nti p-10 text-center">
      <CheckCircle class="size-12 text-nti-green mx-auto mb-4" />
      <h2 class="font-display text-2xl font-bold text-nti-white mb-2">Zadanie odoslané!</h2>
      <p class="text-nti-gray mb-6 text-sm">
        NTI overí špecifikáciu a zverejní ju do backlogu projektov.
      </p>
      <RouterLink :to="{ name: 'company-projects' }" class="btn-primary"
        >Späť na projekty</RouterLink
      >
    </div>

    <template v-else>
      <div class="mb-6">
        <p class="font-mono text-xs text-nti-green mb-1">// Nové zadanie</p>
        <h1 class="font-display text-xl font-bold text-nti-white">
          Technická špecifikácia projektu
        </h1>
        <p class="text-sm text-nti-gray mt-1">
          Po odoslaní NTI overí zadanie a publikuje ho do backlogu. Tímy sa potom môžu prihlasovať.
        </p>
      </div>

      <NtiAlert v-if="serverError" variant="error" :dismissible="false" class="mb-5">
        {{ serverError }}
      </NtiAlert>

      <form class="space-y-5" novalidate @submit.prevent="onSubmit">
        <!-- Základné info -->
        <div class="card-nti p-6 space-y-5">
          <p class="font-mono text-xs text-nti-green">Základné informácie</p>

          <div>
            <label for="title" class="label-nti"
              >Názov projektu <span class="text-nti-green">*</span></label
            >
            <input
              id="title"
              v-model="title"
              v-bind="titleAttrs"
              type="text"
              class="input-nti"
              :class="{ error: errors.title }"
              placeholder="napr. Rezervačný systém pre ambulancie"
            />
            <p v-if="errors.title" class="mt-1 text-xs text-red-400">{{ errors.title }}</p>
          </div>

          <div>
            <label for="description" class="label-nti"
              >Popis projektu <span class="text-nti-green">*</span></label
            >
            <textarea
              id="description"
              v-model="description"
              v-bind="descriptionAttrs"
              rows="5"
              class="input-nti resize-none"
              :class="{ error: errors.description }"
              placeholder="Opíšte problém, ktorý projekt rieši, cieľovú skupinu, hlavné funkcie a očakávané výstupy..."
            />
            <p v-if="errors.description" class="mt-1 text-xs text-red-400">
              {{ errors.description }}
            </p>
          </div>

          <div>
            <label for="techStack" class="label-nti"
              >Požadované technológie <span class="text-nti-green">*</span></label
            >
            <input
              id="techStack"
              v-model="techStack"
              v-bind="techStackAttrs"
              type="text"
              class="input-nti"
              :class="{ error: errors.techStack }"
              placeholder="napr. Vue.js, Laravel, MySQL, REST API"
            />
            <p v-if="errors.techStack" class="mt-1 text-xs text-red-400">{{ errors.techStack }}</p>
          </div>

          <!-- Tags -->
          <div>
            <label class="label-nti">Oblasti / tagy</label>
            <div class="flex gap-2 mb-2">
              <input
                v-model="tagInput"
                type="text"
                class="input-nti flex-1"
                placeholder="napr. Web, IoT, AI..."
                @keydown.enter.prevent="addTag"
                @keydown="(e: KeyboardEvent) => e.key === ',' && (e.preventDefault(), addTag())"
              />
              <button type="button" class="btn-outline text-sm px-3" @click="addTag">
                <Plus class="size-4" />
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in tags" :key="tag" class="badge-green flex items-center gap-1.5">
                {{ tag }}
                <button type="button" @click="removeTag(tag)"><X class="size-3" /></button>
              </span>
            </div>
          </div>
        </div>

        <!-- Tím a termíny -->
        <div class="card-nti p-6 space-y-5">
          <p class="font-mono text-xs text-nti-green">Tím a časový rámec</p>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="teamSize" class="label-nti"
                >Veľkosť tímu <span class="text-nti-green">*</span></label
              >
              <select id="teamSize" v-model="teamSize" v-bind="teamSizeAttrs" class="input-nti">
                <option v-for="n in [2, 3, 4, 5, 6, 7, 8]" :key="n" :value="n">
                  {{ n }} členov
                </option>
              </select>
            </div>
            <div>
              <label for="deadline" class="label-nti"
                >Deadline odovzdania <span class="text-nti-green">*</span></label
              >
              <input
                id="deadline"
                v-model="deadline"
                v-bind="deadlineAttrs"
                type="date"
                class="input-nti"
                :class="{ error: errors.deadline }"
              />
              <p v-if="errors.deadline" class="mt-1 text-xs text-red-400">{{ errors.deadline }}</p>
            </div>
          </div>

          <div>
            <label for="budget" class="label-nti">Rozpočet na odmenu tímu</label>
            <input
              id="budget"
              v-model="budget"
              v-bind="budgetAttrs"
              type="text"
              class="input-nti"
              placeholder="napr. 1 500 € celkovo"
            />
            <p class="mt-1 text-xs text-nti-muted">
              Nepovinné — ale pomáha pri výbere motivovaných tímov.
            </p>
          </div>
        </div>

        <!-- Product Owner -->
        <div class="card-nti p-6 space-y-5">
          <p class="font-mono text-xs text-nti-green">Product Owner</p>
          <p class="text-sm text-nti-gray">
            Product Owner je zástupca firmy, ktorý sa zúčastňuje hodnotenia tímov, komunikuje
            požiadavky a schvaľuje výsledky.
          </p>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="productOwner" class="label-nti"
                >Meno a priezvisko <span class="text-nti-green">*</span></label
              >
              <input
                id="productOwner"
                v-model="productOwner"
                v-bind="productOwnerAttrs"
                type="text"
                class="input-nti"
                :class="{ error: errors.productOwner }"
                placeholder="Ján Novák"
              />
              <p v-if="errors.productOwner" class="mt-1 text-xs text-red-400">
                {{ errors.productOwner }}
              </p>
            </div>
            <div>
              <label for="poEmail" class="label-nti"
                >E-mail PO <span class="text-nti-green">*</span></label
              >
              <input
                id="poEmail"
                v-model="poEmail"
                v-bind="poEmailAttrs"
                type="email"
                class="input-nti"
                :class="{ error: errors.poEmail }"
                placeholder="po@firma.sk"
              />
              <p v-if="errors.poEmail" class="mt-1 text-xs text-red-400">{{ errors.poEmail }}</p>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between pt-1">
          <p class="text-xs text-nti-muted max-w-xs">
            Odoslaním súhlasíte so zverejnením zadania v NTI portáli.
          </p>
          <button type="submit" class="btn-primary" :disabled="isSubmitting">
            <Loader2 v-if="isSubmitting" class="size-4 animate-spin" />
            <template v-else>Odoslať zadanie</template>
          </button>
        </div>
      </form>
    </template>
  </div>
</template>
