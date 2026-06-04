<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useAuthStore } from '@/stores/auth';
import { Eye, EyeOff, Loader2, CheckCircle } from 'lucide-vue-next';

const authStore = useAuthStore();
const showPassword = ref(false);
const success = ref(false);

const schema = z
  .object({
    firstName: z.string().min(2, 'Meno je povinné'),
    lastName: z.string().min(2, 'Priezvisko je povinné'),
    email: z.string().email('Zadajte platný e-mail'),
    password: z.string().min(8, 'Heslo musí mať aspoň 8 znakov'),
    passwordConfirmation: z.string().min(1, 'Potvrďte heslo'),
    companyName: z.string().min(2, 'Názov firmy je povinný'),
    ico: z
      .string()
      .min(6, 'IČO musí mať aspoň 6 znakov')
      .max(12, 'IČO je príliš dlhé'),
    sector: z.string().min(2, 'Sektor je povinný'),
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
});

const [firstName, firstNameAttrs] = defineField('firstName');
const [lastName, lastNameAttrs] = defineField('lastName');
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [passwordConfirmation, passwordConfirmationAttrs] = defineField('passwordConfirmation');
const [companyName, companyNameAttrs] = defineField('companyName');
const [ico, icoAttrs] = defineField('ico');
const [sector, sectorAttrs] = defineField('sector');
const [gdprConsent, gdprConsentAttrs] = defineField('gdprConsent');

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
  await authStore.registerCompany({
    ...values,
    gdprConsent: values.gdprConsent as true,
  });
  success.value = true;
});
</script>

<template>
  <div class="card-nti p-8">
    <!-- Success -->
    <div v-if="success" class="text-center py-8">
      <CheckCircle class="size-12 text-nti-green mx-auto mb-4" />
      <h2 class="font-display text-xl font-bold text-nti-white mb-2">Registrácia úspešná!</h2>
      <p class="text-nti-gray text-sm mb-6">
        Váš firemný účet bol odoslaný na overenie. Dostanete e-mail s ďalšími inštrukciami.
      </p>
      <RouterLink :to="{ name: 'login' }" class="btn-primary">Prejsť na prihlásenie</RouterLink>
    </div>

    <template v-else>
      <div class="mb-7">
        <p class="font-mono text-xs text-nti-green mb-1">// Registrácia</p>
        <h1 class="font-display text-2xl font-bold text-nti-white mb-2">Registrácia firmy</h1>
        <p class="text-sm text-nti-gray">
          <RouterLink :to="{ name: 'register' }" class="text-nti-green hover:text-nti-green-light">
            ← Späť na výber
          </RouterLink>
        </p>
      </div>

      <div
        v-if="authStore.error"
        class="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
        role="alert"
      >
        {{ authStore.error }}
      </div>

      <form class="space-y-5" novalidate @submit.prevent="onSubmit">
        <!-- Contact person -->
        <div class="card-nti p-4 space-y-4">
          <p class="font-mono text-xs text-nti-green">Kontaktná osoba</p>
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
              />
              <p v-if="errors.lastName" class="mt-1 text-xs text-red-400">{{ errors.lastName }}</p>
            </div>
          </div>
          <div>
            <label for="email" class="label-nti">Pracovný e-mail</label>
            <input
              id="email"
              v-model="email"
              v-bind="emailAttrs"
              type="email"
              class="input-nti"
              :class="{ error: errors.email }"
              placeholder="kontakt@firma.sk"
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-400">{{ errors.email }}</p>
          </div>
        </div>

        <!-- Company info -->
        <div class="card-nti p-4 space-y-4">
          <p class="font-mono text-xs text-nti-green">Údaje o firme</p>
          <div>
            <label for="companyName" class="label-nti">Názov firmy</label>
            <input
              id="companyName"
              v-model="companyName"
              v-bind="companyNameAttrs"
              type="text"
              class="input-nti"
              :class="{ error: errors.companyName }"
              placeholder="Acme s.r.o."
            />
            <p v-if="errors.companyName" class="mt-1 text-xs text-red-400">{{ errors.companyName }}</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="ico" class="label-nti">IČO</label>
              <input
                id="ico"
                v-model="ico"
                v-bind="icoAttrs"
                type="text"
                class="input-nti"
                :class="{ error: errors.ico }"
                placeholder="12345678"
              />
              <p v-if="errors.ico" class="mt-1 text-xs text-red-400">{{ errors.ico }}</p>
            </div>
            <div>
              <label for="sector" class="label-nti">Sektor</label>
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
        <div>
          <label for="passwordConfirmation" class="label-nti">Potvrdiť heslo</label>
          <input
            id="passwordConfirmation"
            v-model="passwordConfirmation"
            v-bind="passwordConfirmationAttrs"
            type="password"
            class="input-nti"
            :class="{ error: errors.passwordConfirmation }"
            placeholder="Zadajte heslo znova"
          />
          <p v-if="errors.passwordConfirmation" class="mt-1 text-xs text-red-400">
            {{ errors.passwordConfirmation }}
          </p>
        </div>

        <!-- GDPR -->
        <div class="flex items-start gap-3">
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
            a podmienkami NTI.
          </label>
        </div>
        <p v-if="errors.gdprConsent" class="text-xs text-red-400">{{ errors.gdprConsent }}</p>

        <button
          type="submit"
          class="btn-primary w-full justify-center py-2.5"
          :disabled="isSubmitting"
        >
          <Loader2 v-if="isSubmitting" class="size-4 animate-spin" />
          <template v-else>Zaregistrovať firmu</template>
        </button>
      </form>
    </template>
  </div>
</template>