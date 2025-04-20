import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './style.css';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

const pinia = createPinia();

createApp(App).use(pinia).use(router).use(PrimeVue, {
    theme: {
        preset: Aura
    }
}).use(ToastService).component('Toast', Toast).mount('#app')
