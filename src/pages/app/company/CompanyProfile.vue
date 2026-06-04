<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useForm } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/zod';
  import { z } from 'zod';
  import { Loader2, Save, Building2 } from 'lucide-vue-next';
  import { useProfileStore } from '@/stores/profile';
  import NtiAlert from '@/components/ui/NtiAlert.vue';

  const profileStore = useProfileStore();

  onMounted(() => {
    void profileStore.fetchCompanyProfile();
  });

  const schema = z.object({
    name: z.string().min(2, 'Názov firmy je povinný'),
    sector: z.string().min(2, 'Sektor je povinný'),
    description: z.string().max(1000, 'Popis je príliš dlhý').optional(),
    contactPhone: z.string().optional(),
    website: z.string().url('Zadajte platnú URL').optional().or(z.literal('')),
  });

  const { handleSubmit, errors, defineField, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const [name, nameAttrs] = defineField('name');
  const [sector, sectorAttrs] = defineField('sector');
  const [description, descriptionAttrs] = defineField('description');
  const [contactPhone, contactPhoneAttrs] = defineField('contactPhone');
  const [website, websiteAttrs] = defineField('website');

  const sectors = [
    'IT / Softvér',
    'Fintech',
    'Zdravotníctvo',
    'Výroba',
    'Obchod',
    'Vzdelávanie',
    'Iné',
  ];

  const onSubmit = handleSubmit(async (values) => {
    await profileStore.updateCompanyProfile(values);
  });
</script>

<template>
  <div class="max-w-2xl">
    <div class="mb-6">
      <p class="font-mono text-xs text-nti-green mb-1">// Profil firmy</p>
      <h1 class="font-display text-xl font-bold text-nti-white">Profil firmy</h1>
    </div>

    <NtiAlert v-if="profileStore.successMessage" variant="success" :dismissible="true" class="mb-5">
      {{ profileStore.successMessage }}
    </NtiAlert>
    <NtiAlert v-if="profileStore.error" variant="error" :dismissible="true" class="mb-5">
      {{ profileStore.error }}
    </NtiAlert>

    <!-- Logo placeholder -->
    <div class="card-nti p-6 flex items-center gap-5 mb-5">
      <div
        class="size-16 rounded-2xl bg-nti-surface border border-nti-border flex items-center justify-center shrink-0"
      >
        <Building2 class="size-8 text-nti-gray" />
      </div>
      <div>
        <p class="font-display font-semibold text-nti-white mb-0.5">Logo firmy</p>
        <p class="text-xs text-nti-gray">Funkcia pre nahranie loga príde v ďalšej verzii.</p>
      </div>
    </div>

    <div class="card-nti p-6">
      <h2 class="font-display font-semibold text-nti-white mb-5">Údaje o firme</h2>
      <form class="space-y-5" novalidate @submit.prevent="onSubmit">
        <div>
          <label for="name" class="label-nti"
            >Názov firmy <span class="text-nti-green">*</span></label
          >
          <input
            id="name"
            v-model="name"
            v-bind="nameAttrs"
            type="text"
            class="input-nti"
            :class="{ error: errors.name }"
          />
          <p v-if="errors.name" class="mt-1 text-xs text-red-400">{{ errors.name }}</p>
        </div>

        <div>
          <label for="sector" class="label-nti">Sektor <span class="text-nti-green">*</span></label>
          <select
            id="sector"
            v-model="sector"
            v-bind="sectorAttrs"
            class="input-nti"
            :class="{ error: errors.sector }"
          >
            <option value="" disabled>Vybrať sektor</option>
            <option v-for="s in sectors" :key="s" :value="s">{{ s }}</option>
          </select>
          <p v-if="errors.sector" class="mt-1 text-xs text-red-400">{{ errors.sector }}</p>
        </div>

        <div>
          <label for="description" class="label-nti">Popis firmy</label>
          <textarea
            id="description"
            v-model="description"
            v-bind="descriptionAttrs"
            rows="4"
            class="input-nti resize-none"
            placeholder="Krátky popis firmy, oblasti pôsobenia a aktivít..."
          />
          <p v-if="errors.description" class="mt-1 text-xs text-red-400">
            {{ errors.description }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="contactPhone" class="label-nti">Telefón</label>
            <input
              id="contactPhone"
              v-model="contactPhone"
              v-bind="contactPhoneAttrs"
              type="tel"
              class="input-nti"
              placeholder="+421 900 000 000"
            />
          </div>
          <div>
            <label for="website" class="label-nti">Web</label>
            <input
              id="website"
              v-model="website"
              v-bind="websiteAttrs"
              type="url"
              class="input-nti"
              :class="{ error: errors.website }"
              placeholder="https://firma.sk"
            />
            <p v-if="errors.website" class="mt-1 text-xs text-red-400">{{ errors.website }}</p>
          </div>
        </div>

        <div class="flex justify-end pt-1">
          <button type="submit" class="btn-primary" :disabled="isSubmitting">
            <Loader2 v-if="isSubmitting" class="size-4 animate-spin" />
            <Save v-else class="size-4" />
            Uložiť zmeny
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
