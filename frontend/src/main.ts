import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './style.css';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css'

const pinia = createPinia();

createApp(App).use(pinia).use(router).use(PrimeVue, {
    theme: {
        preset: Aura
    }
}).mount('#app')
