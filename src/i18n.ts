import { createI18n } from 'vue-i18n';
import sk from '@/locales/sk.json';
import en from '@/locales/en.json';

const in18n = createI18n({
  legacy: false,
  locale: 'sk',
  fallbackLocale: 'sk',
  messages: {
    sk,
    en,
  },
});

export default in18n;
