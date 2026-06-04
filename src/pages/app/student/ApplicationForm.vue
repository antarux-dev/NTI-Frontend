<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute, RouterLink } from 'vue-router';
  import { useForm } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/zod';
  import { z } from 'zod';
  import { ArrowLeft, CheckCircle, Loader2, Upload } from 'lucide-vue-next';
  import { useApplicationStore } from '@/stores/applications';
  import ApplicationService from '@/services/applications.service';
  import ProgramService from '@/services/programs.service';
  import NtiAlert from '@/components/ui/NtiAlert.vue';
  import type { Call } from '@/types';

  const router = useRouter();
  const route = useRoute();
  const appStore = useApplicationStore();

  const callId = Number(route.query['callId']);
  const call = ref<Call | null>(null);
  const submittedAppId = ref<number | null>(null);
  const uploadingDoc = ref(false);
  const docFile = ref<File | null>(null);
  const docFileInput = ref<HTMLInputElement | null>(null);

  onMounted(async () => {
    if (callId) {
      call.value = await ProgramService.getCall(callId);
    }
  });

  const schema = z.object({
    motivationLetter: z
      .string()
      .min(50, 'Motivačný list musí mať aspoň 50 znakov')
      .max(3000, 'Motivačný list nesmie presiahnuť 3000 znakov'),
  });

  const { handleSubmit, errors, defineField, isSubmitting, values } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const [motivationLetter, motivationLetterAttrs] = defineField('motivationLetter');
  const charCount = () => values.motivationLetter?.length ?? 0;

  const onSubmit = handleSubmit(async (vals) => {
    const created = await appStore.createApplication({
      callId,
      motivationLetter: vals.motivationLetter,
    });
    await appStore.submitApplication(created.id);
    submittedAppId.value = created.id;
  });

  function handleDocChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    docFile.value = input.files?.[0] ?? null;
  }

  async function uploadDocument(): Promise<void> {
    if (!submittedAppId.value || !docFile.value) return;
    uploadingDoc.value = true;
    try {
      await ApplicationService.uploadDocument(submittedAppId.value, docFile.value, 'priloha');
      docFile.value = null;
    } finally {
      uploadingDoc.value = false;
    }
  }
</script>

<template>
  <div class="max-w-2xl">
    <RouterLink :to="{ name: 'student-applications' }" class="btn-ghost text-sm mb-6 inline-flex">
      <ArrowLeft class="size-4" />
      Späť
    </RouterLink>

    <!-- Success state -->
    <div v-if="submittedAppId" class="card-nti p-10 text-center">
      <CheckCircle class="size-14 text-nti-green mx-auto mb-4" />
      <h2 class="font-display text-2xl font-bold text-nti-white mb-2">Prihláška odoslaná!</h2>
      <p class="text-nti-gray mb-8">
        Vaša prihláška bola úspešne odoslaná. Sledujte jej stav v prehľade prihlášok.
      </p>

      <!-- Optional doc upload after submission -->
      <div class="card-nti p-5 text-left mb-6">
        <p class="font-display font-semibold text-nti-white mb-3 text-sm">Priložiť CV / prílohu</p>
        <div class="flex items-center gap-3">
          <input ref="docFileInput" type="file" class="hidden" @change="handleDocChange" />
          <button class="btn-outline text-sm" @click="docFileInput?.click()">
            <Upload class="size-3.5" />
            Vybrať súbor
          </button>
          <span v-if="docFile" class="text-xs text-nti-green font-mono truncate">
            {{ docFile.name }}
          </span>
          <button
            v-if="docFile"
            class="btn-primary text-sm"
            :disabled="uploadingDoc"
            @click="uploadDocument"
          >
            <Loader2 v-if="uploadingDoc" class="size-3.5 animate-spin" />
            <template v-else>Nahrať</template>
          </button>
        </div>
      </div>

      <RouterLink
        :to="{ name: 'student-application-detail', params: { id: submittedAppId } }"
        class="btn-primary"
      >
        Zobraziť prihlášku
      </RouterLink>
    </div>

    <template v-else>
      <div class="mb-6">
        <p class="font-mono text-xs text-nti-green mb-1">// Nová prihláška</p>
        <h1 class="font-display text-xl font-bold text-nti-white">
          {{ call?.title ?? 'Podať prihlášku' }}
        </h1>
        <p v-if="call" class="text-sm text-nti-muted font-mono mt-1">
          Program {{ call.programId === 1 ? 'A' : 'B' }} · Deadline:
          {{ new Intl.DateTimeFormat('sk-SK').format(new Date(call.deadline)) }}
        </p>
      </div>

      <NtiAlert v-if="appStore.error" variant="error" :dismissible="false" class="mb-5">
        {{ appStore.error }}
      </NtiAlert>

      <form novalidate @submit.prevent="onSubmit">
        <div class="card-nti p-6 mb-4">
          <label for="motivationLetter" class="label-nti">
            Motivačný list
            <span class="text-nti-green ml-0.5">*</span>
          </label>
          <textarea
            id="motivationLetter"
            v-model="motivationLetter"
            v-bind="motivationLetterAttrs"
            rows="10"
            class="input-nti resize-none mt-1.5"
            :class="{ error: errors.motivationLetter }"
            placeholder="Popíšte vašu motiváciu, zručnosti a prečo chcete byť súčasťou NTI..."
          />
          <div class="flex items-center justify-between mt-1.5">
            <p v-if="errors.motivationLetter" class="text-xs text-red-400">
              {{ errors.motivationLetter }}
            </p>
            <span class="text-xs text-nti-muted ml-auto"> {{ charCount() }} / 3000 </span>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <p class="text-xs text-nti-muted max-w-xs">
            Odoslaním súhlasíte so spracovaním prihlášky komisiou NTI.
          </p>
          <button type="submit" class="btn-primary" :disabled="isSubmitting">
            <Loader2 v-if="isSubmitting" class="size-4 animate-spin" />
            <template v-else>Odoslať prihlášku</template>
          </button>
        </div>
      </form>
    </template>
  </div>
</template>
