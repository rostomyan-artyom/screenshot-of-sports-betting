import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router/index';
import './assets/styles/index.scss';
import App from './App.vue';

import BalmUI from 'balm-ui'; // Official Google Material Components
import BalmUIPlus from 'balm-ui-plus'; // BalmJS Team Material Components
import 'balm-ui-css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(BalmUI);
app.use(BalmUIPlus);

app.mount('#app')
