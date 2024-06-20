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
import Calendar from 'primevue/calendar';
import Dropdown from "primevue/dropdown";
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import TieredMenu from 'primevue/tieredmenu';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmationService from 'primevue/confirmationservice';
import {messaging} from './firebase';

const app = createApp(App)

app.config.globalProperties.$firebaseMessaging = messaging

app.use(router)
app.use(PrimeVue)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('InputSwitch', InputSwitch)
app.component('Password', Password)
app.component('FloatLabel', FloatLabel)
app.component('TieredMenu', TieredMenu)
app.component('InputNumber', InputNumber)
app.component('Dialog', Dialog)
app.component('ConfirmDialog', ConfirmDialog)
app.component('Calendar', Calendar)
app.component('Dropdown', Dropdown)
app.component('InputGroup', InputGroup)
app.component('InputGroupAddon', InputGroupAddon)
app.use(ConfirmationService);

app.mount('#app')
