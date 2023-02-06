import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vantConfig from './vant-config'
import 'animate.css';
// animate__animated animate__bounce animate__delay-2s
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vantConfig)



app.mount('#app')
