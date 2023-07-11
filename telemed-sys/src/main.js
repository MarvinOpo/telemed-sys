import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import './style.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'


createApp(App)
    .use(Quasar)
    .use(router)
    .use(pinia)
    .mount('#app')
