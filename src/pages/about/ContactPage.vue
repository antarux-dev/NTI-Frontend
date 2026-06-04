<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { Loader2, CheckCircle, MapPin, Mail, Globe } from 'lucide-vue-next';

const success = ref(false);

const schema = z.object({
  name: z.string().min(2, 'Meno je povinné'),
  email: z.string().email('Zadajte platný e-mail'),
  subject: z.string().min(3, 'Predmet je povinný'),
  message: z.string().min(10, 'Správa musí mať aspoň 10 znakov'),
});

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
});

const [name, nameAttrs] = defineField('name');
const [email, emailAttrs] = defineField('email');
const [subject, subjectAttrs] = defineField('subject');
const [message, messageAttrs] = defineField('message');

const onSubmit = handleSubmit(async (_values) => {
  // TODO: integrate with backend contact endpoint
  await new Promise((r) => setTimeout(r, 800));
  success.value = true;
});
</script>

<template>
  <div>
    <section class="bg-circuit pt-28 pb-20">
      <div class="container-nti">
        <p class="font-mono text-xs text-nti-green uppercase tracking-widest mb-3">// Kontakt</p>
        <h1 class="font-display text-5xl font-bold text-nti-white mb-4">Kontaktujte nás</h1>
        <p class="text-nti-gray text-lg max-w-xl">Máte otázky? Napíšte nám alebo navštívte naše priestory.</p>
      </div>
    </section>

    <section class="py-20 bg-nti-black">
      <div class="container-nti">
        <div class="grid md:grid-cols-5 gap-8">
          <!-- Form -->
          <div class="md:col-span-3">
            <div v-if="success" class="card-nti p-10 text-center">
              <CheckCircle class="size-12 text-nti-green mx-auto mb-4" />
              <h2 class="font-display text-xl font-bold text-nti-white mb-2">Správa odoslaná!</h2>
              <p class="text-nti-gray">Ozveme sa vám čo najskôr.</p>
            </div>

            <div v-else class="card-nti p-8">
              <h2 class="font-display text-xl font-bold text-nti-white mb-6">Napísať správu</h2>
              <form class="space-y-5" novalidate @submit.prevent="onSubmit">
                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label for="name" class="label-nti">Meno</label>
                    <input
                      id="name"
                      v-model="name"
                      v-bind="nameAttrs"
                      type="text"
                      class="input-nti"
                      :class="{ error: errors.name }"
                      placeholder="Vaše meno"
                    />
                    <p v-if="errors.name" class="mt-1 text-xs text-red-400">{{ errors.name }}</p>
                  </div>
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
                    />
                    <p v-if="errors.email" class="mt-1 text-xs text-red-400">{{ errors.email }}</p>
                  </div>
                </div>

                <div>
                  <label for="subject" class="label-nti">Predmet</label>
                  <input
                    id="subject"
                    v-model="subject"
                    v-bind="subjectAttrs"
                    type="text"
                    class="input-nti"
                    :class="{ error: errors.subject }"
                    placeholder="Predmet správy"
                  />
                  <p v-if="errors.subject" class="mt-1 text-xs text-red-400">{{ errors.subject }}</p>
                </div>

                <div>
                  <label for="message" class="label-nti">Správa</label>
                  <textarea
                    id="message"
                    v-model="message"
                    v-bind="messageAttrs"
                    rows="5"
                    class="input-nti resize-none"
                    :class="{ error: errors.message }"
                    placeholder="Vaša správa..."
                  />
                  <p v-if="errors.message" class="mt-1 text-xs text-red-400">{{ errors.message }}</p>
                </div>

                <button
                  type="submit"
                  class="btn-primary w-full justify-center py-2.5"
                  :disabled="isSubmitting"
                >
                  <Loader2 v-if="isSubmitting" class="size-4 animate-spin" />
                  <template v-else>Odoslať správu</template>
                </button>
              </form>
            </div>
          </div>

          <!-- Contact info -->
          <div class="md:col-span-2 space-y-4">
            <div class="card-nti p-6">
              <MapPin class="size-5 text-nti-green mb-3" />
              <h3 class="font-display font-semibold text-nti-white mb-2">Adresa</h3>
              <p class="text-sm text-nti-gray">
                Fakulta prírodných vied a informatiky<br />
                Tr. A. Hlinku 1<br />
                949 74 Nitra, Slovensko
              </p>
            </div>
            <div class="card-nti p-6">
              <Mail class="size-5 text-nti-green mb-3" />
              <h3 class="font-display font-semibold text-nti-white mb-2">E-mail</h3>
              <a href="mailto:nti@ukf.sk" class="text-sm text-nti-green hover:underline">nti@ukf.sk</a>
            </div>
            <div class="card-nti p-6">
              <Globe class="size-5 text-nti-green mb-3" />
              <h3 class="font-display font-semibold text-nti-white mb-2">Web</h3>
              <a
                href="https://www.fpvai.ukf.sk"
                target="_blank"
                class="text-sm text-nti-green hover:underline"
              >
                www.fpvai.ukf.sk
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>