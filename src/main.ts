
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


import { library } from '@fortawesome/fontawesome-svg-core';
import { faLink, faEnvelope, faMobile, faMobileAlt, faCaretDown, faThumbsUp, faThumbsDown, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome';

library.add(faLink, faEnvelope, faMobile, faMobileAlt, faCaretDown, faThumbsUp, faThumbsDown, faCheck, faTimes);

app.component('font-awesome-icon', FontAwesomeIcon);
app.component('font-awesome-layers', FontAwesomeLayers);

app.use(Router)
app.use(createPinia())
app.mount('#app');