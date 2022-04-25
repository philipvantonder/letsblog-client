
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Router from './router/index';

/* Bootstrap Styles */
import './assets/css/style.scss';
import 'bootstrap';

import App from './App.vue';

const app = createApp(App);

app.use(Router)
app.use(createPinia())
app.mount('#app');