import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'

import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primevue/resources/primevue.min.css';

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputSwitch from 'primevue/inputswitch';
import Password from 'primevue/password';
import FloatLabel from "primevue/floatlabel";

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('InputSwitch', InputSwitch)
app.component('Password', Password)
app.component('FloatLabel', FloatLabel)

app.mount('#app')
