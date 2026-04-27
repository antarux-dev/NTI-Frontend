import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import router from '@/router/index';
import './assets/main.css';
import './styles/index.css';
import in18n from '@/i18n';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(in18n);

app.mount('#app');
