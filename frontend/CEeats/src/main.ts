import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'

import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primevue/resources/primevue.min.css';

import Button from "primevue/button";

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.component('Button', Button)
app.mount('#app')
