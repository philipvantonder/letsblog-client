
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Router from './router/index';

/* Bootstrap Styles */
import './assets/css/style.scss';
import 'bootstrap';

import App from './App.vue';

const app = createApp(App);

import Navbar from './components/layout/Navbar.vue';
import Sidebar from './components/layout/Sidebar.vue';

app.component('navbar', Navbar);
app.component('sidebar', Sidebar);

app.use(Router)
app.use(createPinia())
app.mount('#app');