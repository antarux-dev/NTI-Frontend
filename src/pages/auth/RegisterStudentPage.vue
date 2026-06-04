<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useAuthStore } from '@/stores/auth';
import { Eye, EyeOff, Loader2, CheckCircle } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();
const showPassword = ref(false);
const showPasswordConfirm = ref(false);
const success = ref(false);

const schema = z
  .object({
    firstName: z.string().min(2, 'Meno musí mať aspoň 2 znaky'),
    lastName: z.string().min(2, 'Priezvisko musí mať aspoň 2 znaky'),
    email: z.string().min(1, 'E-mail je povinný').email('Zadajte platný e-mail'),
    password: z.string().min(8, 'Heslo musí mať aspoň 8 znakov'),
    passwordConfirmation: z.string().min(1, 'Potvrďte heslo'),
    studyProgram: z.string().min(2, 'Zadajte študijný program'),
    yearOfStudy: z.coerce.number().int().min(1).max(6),
    gdprConsent: z.literal(true, {
      errorMap: () => ({ message: 'Musíte súhlasiť so spracovaním údajov' }),
    }),
  })
  .refine((d) => d.password === d.passwordConfirmation, {
    message: 'Heslá sa nezhodujú',
    path: ['passwordConfirmation'],
  });

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: { yearOfStudy: 1 },
});

const [firstName, firstNameAttrs] = defineField('firstName');
const [lastName, lastNameAttrs] = defineField('lastName');
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [passwordConfirmation, passwordConfirmationAttrs] = defineField('passwordConfirmation');
const [studyProgram, studyProgramAttrs] = defineField('studyProgram');
const [yearOfStudy, yearOfStudyAttrs] = defineField('yearOfStudy');
const [gdprConsent, gdprConsentAttrs] = defineField('gdprConsent');

const studyPrograms = [
  'Aplikovaná informatika',
  'Informačné technológie',
  'Počítačové inžinierstvo',
  'Kybernetická bezpečnosť',
  'Iné',
];

const onSubmit = handleSubmit(async (values) => {
  await authStore.registerStudent({
    ...values,
    gdprConsent: values.gdprConsent as true,
  });
  success.value = true;
});
</script>

<template>
  <div class="card-nti p-8">
    <!-- Success state -->
    <div v-if="success" class="text-center py-8">
      <CheckCircle class="size-12 text-nti-green mx-auto mb-4" />
      <h2 class="font-display text-xl font-bold text-nti-white mb-2">
        Registrácia úspešná!
      </h2>
      <p class="text-nti-gray text-sm mb-6">
        Na váš e-mail bol odoslaný overovací odkaz. Po overení sa môžete prihlásiť.
      </p>
      <RouterLink :to="{ name: 'login' }" class="btn-primary">
        Prejsť na prihlásenie
      </RouterLink>
    </div>

    <template v-else>
      <!-- Header -->
      <div class="mb-7">
        <p class="font-mono text-xs text-nti-green mb-1">// Registrácia</p>
        <h1 class="font-display text-2xl font-bold text-nti-white mb-2">
          Registrácia študenta
        </h1>
        <p class="text-sm text-nti-gray">
          <RouterLink :to="{ name: 'register' }" class="text-nti-green hover:text-nti-green-light">
            ← Späť na výber
          </RouterLink>
        </p>
      </div>

      <!-- Error banner -->
      <div
        v-if="authStore.error"
        class="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
        role="alert"
      >
        {{ authStore.error }}
      </div>

      <form class="space-y-5" novalidate @submit.prevent="onSubmit">
        <!-- Name row -->
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
              placeholder="Ján"
              autocomplete="given-name"
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
              placeholder="Novák"
              autocomplete="family-name"
            />
            <p v-if="errors.lastName" class="mt-1 text-xs text-red-400">{{ errors.lastName }}</p>
          </div>
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="label-nti">E-mail</label>
          <input
            id="email"
            v-model="email"
            v-bind="emailAttrs"
            type="email"
            class="input-nti"
            :class="{ error: errors.email }"
            placeholder="vas@email.sk"
            autocomplete="email"
          />
          <p v-if="errors.email" class="mt-1 text-xs text-red-400">{{ errors.email }}</p>
        </div>

        <!-- Study program + year -->
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
              <option value="" disabled>Vybrať program</option>
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

        <!-- Password -->
        <div>
          <label for="password" class="label-nti">Heslo</label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              v-bind="passwordAttrs"
              :type="showPassword ? 'text' : 'password'"
              class="input-nti pr-10"
              :class="{ error: errors.password }"
              placeholder="Min. 8 znakov"
              autocomplete="new-password"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-nti-muted hover:text-nti-gray transition-colors"
              @click="showPassword = !showPassword"
            >
              <EyeOff v-if="showPassword" class="size-4" />
              <Eye v-else class="size-4" />
            </button>
          </div>
          <p v-if="errors.password" class="mt-1 text-xs text-red-400">{{ errors.password }}</p>
        </div>

        <!-- Password confirm -->
        <div>
          <label for="passwordConfirmation" class="label-nti">Potvrdiť heslo</label>
          <div class="relative">
            <input
              id="passwordConfirmation"
              v-model="passwordConfirmation"
              v-bind="passwordConfirmationAttrs"
              :type="showPasswordConfirm ? 'text' : 'password'"
              class="input-nti pr-10"
              :class="{ error: errors.passwordConfirmation }"
              placeholder="Zadajte heslo znova"
              autocomplete="new-password"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-nti-muted hover:text-nti-gray transition-colors"
              @click="showPasswordConfirm = !showPasswordConfirm"
            >
              <EyeOff v-if="showPasswordConfirm" class="size-4" />
              <Eye v-else class="size-4" />
            </button>
          </div>
          <p v-if="errors.passwordConfirmation" class="mt-1 text-xs text-red-400">
            {{ errors.passwordConfirmation }}
          </p>
        </div>

        <!-- GDPR -->
        <div class="flex items-start gap-3 pt-1">
          <input
            id="gdprConsent"
            v-model="gdprConsent"
            v-bind="gdprConsentAttrs"
            type="checkbox"
            class="mt-0.5 size-4 rounded border-nti-border bg-nti-dark accent-nti-green cursor-pointer"
          />
          <label for="gdprConsent" class="text-xs text-nti-gray cursor-pointer leading-relaxed">
            Súhlasím so
            <a href="#" class="text-nti-green hover:underline">spracovaním osobných údajov</a>
            v súlade s GDPR a podmienkami NTI.
          </label>
        </div>
        <p v-if="errors.gdprConsent" class="text-xs text-red-400">{{ errors.gdprConsent }}</p>

        <!-- Submit -->
        <button
          type="submit"
          class="btn-primary w-full justify-center py-2.5"
          :disabled="isSubmitting"
        >
          <Loader2 v-if="isSubmitting" class="size-4 animate-spin" />
          <template v-else>Vytvoriť účet</template>
        </button>
      </form>
    </template>
  </div>
</template>