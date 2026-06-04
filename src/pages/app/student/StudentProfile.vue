<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { Loader2, Upload, User, Save } from 'lucide-vue-next';
import { useProfileStore } from '@/stores/profile';
import NtiAlert from '@/components/ui/NtiAlert.vue';

const profileStore = useProfileStore();
const cvFile = ref<File | null>(null);
const cvInputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  void profileStore.fetchStudentProfile();
});

const schema = z.object({
  firstName: z.string().min(2, 'Meno je povinné'),
  lastName: z.string().min(2, 'Priezvisko je povinné'),
  studyProgram: z.string().min(2, 'Zadajte program'),
  yearOfStudy: z.coerce.number().int().min(1).max(6),
});

const { handleSubmit, errors, defineField, setValues, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
});

const [firstName, firstNameAttrs] = defineField('firstName');
const [lastName, lastNameAttrs] = defineField('lastName');
const [studyProgram, studyProgramAttrs] = defineField('studyProgram');
const [yearOfStudy, yearOfStudyAttrs] = defineField('yearOfStudy');

// Prefill form when profile loads
onMounted(() => {
  const unwatch = setInterval(() => {
    if (profileStore.studentProfile) {
      setValues({
        firstName: '',
        lastName: '',
        studyProgram: profileStore.studentProfile.studyProgram,
        yearOfStudy: profileStore.studentProfile.yearOfStudy,
      });
      clearInterval(unwatch);
    }
  }, 100);
});

const onSubmit = handleSubmit(async (values) => {
  await profileStore.updateStudentProfile(values);
});

function handleCvChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files?.[0]) {
    cvFile.value = input.files[0];
  }
}

async function uploadCV(): Promise<void> {
  if (!cvFile.value) return;
  await profileStore.uploadCV(cvFile.value);
  cvFile.value = null;
}

const studyPrograms = [
  'Aplikovaná informatika',
  'Informačné technológie',
  'Počítačové inžinierstvo',
  'Kybernetická bezpečnosť',
  'Iné',
];
</script>

<template>
  <div class="max-w-2xl">
    <div class="mb-6">
      <p class="font-mono text-xs text-nti-green mb-1">// Profil</p>
      <h1 class="font-display text-xl font-bold text-nti-white">Môj profil</h1>
    </div>

    <NtiAlert
      v-if="profileStore.successMessage"
      variant="success"
      :dismissible="true"
      class="mb-5"
    >
      {{ profileStore.successMessage }}
    </NtiAlert>

    <NtiAlert
      v-if="profileStore.error"
      variant="error"
      :dismissible="true"
      class="mb-5"
    >
      {{ profileStore.error }}
    </NtiAlert>

    <!-- Avatar placeholder + CV -->
    <div class="card-nti p-6 flex items-center gap-6 mb-5">
      <div class="size-16 rounded-2xl bg-nti-surface border border-nti-border flex items-center justify-center shrink-0">
        <User class="size-8 text-nti-gray" />
      </div>
      <div class="flex-1">
        <p class="font-display font-semibold text-nti-white mb-1">Životopis (CV)</p>
        <p class="text-xs text-nti-gray mb-3">
          {{
            profileStore.studentProfile?.cvUrl
              ? 'CV je nahraté. Môžete ho nahradiť novým.'
              : 'Nahrajte CV vo formáte PDF.'
          }}
        </p>
        <div class="flex items-center gap-3">
          <input
            ref="cvInputRef"
            type="file"
            accept=".pdf"
            class="hidden"
            @change="handleCvChange"
          />
          <button
            class="btn-outline text-sm"
            @click="cvInputRef?.click()"
          >
            <Upload class="size-3.5" />
            Vybrať súbor
          </button>
          <span v-if="cvFile" class="text-xs text-nti-green font-mono truncate max-w-[140px]">
            {{ cvFile.name }}
          </span>
          <button
            v-if="cvFile"
            class="btn-primary text-sm"
            :disabled="profileStore.loading"
            @click="uploadCV"
          >
            <Loader2 v-if="profileStore.loading" class="size-3.5 animate-spin" />
            <template v-else>Nahrať</template>
          </button>
        </div>
      </div>
    </div>

    <!-- Profile form -->
    <div class="card-nti p-6">
      <h2 class="font-display font-semibold text-nti-white mb-5">Osobné údaje</h2>

      <form class="space-y-5" novalidate @submit.prevent="onSubmit">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="label-nti">Meno</label>
            <input
              id="firstName"
              v-model="firstName"
              v-bind="firstNameAttrs"
              type="text"
              class="input-nti"
              :class="{ error: errors.firstName }"
            />
            <p v-if="errors.firstName" class="mt-1 text-xs text-red-400">{{ errors.firstName }}</p>
          </div>
          <div>
            <label for="lastName" class="label-nti">Priezvisko</label>
            <input
              id="lastName"
              v-model="lastName"
              v-bind="lastNameAttrs"
              type="text"
              class="input-nti"
              :class="{ error: errors.lastName }"
            />
            <p v-if="errors.lastName" class="mt-1 text-xs text-red-400">{{ errors.lastName }}</p>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-2">
            <label for="studyProgram" class="label-nti">Študijný program</label>
            <select
              id="studyProgram"
              v-model="studyProgram"
              v-bind="studyProgramAttrs"
              class="input-nti"
              :class="{ error: errors.studyProgram }"
            >
              <option value="" disabled>Vybrať</option>
              <option v-for="p in studyPrograms" :key="p" :value="p">{{ p }}</option>
            </select>
            <p v-if="errors.studyProgram" class="mt-1 text-xs text-red-400">{{ errors.studyProgram }}</p>
          </div>
          <div>
            <label for="yearOfStudy" class="label-nti">Ročník</label>
            <select
              id="yearOfStudy"
              v-model="yearOfStudy"
              v-bind="yearOfStudyAttrs"
              class="input-nti"
            >
              <option v-for="y in [1, 2, 3, 4, 5, 6]" :key="y" :value="y">{{ y }}.</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end pt-1">
          <button
            type="submit"
            class="btn-primary"
            :disabled="isSubmitting"
          >
            <Loader2 v-if="isSubmitting" class="size-4 animate-spin" />
            <Save v-else class="size-4" />
            Uložiť zmeny
          </button>
        </div>
      </form>
    </div>
  </div>
</template>