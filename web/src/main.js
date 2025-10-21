import 'virtual:svg-icons-register'
import './assets/styles/index.scss'

import { createApp } from 'vue'

import App from './App.vue'
import store from './stores'
import router from './router'
import useIcons from './plugins/use-icons'
import config from "../public/config"
console.log("config",config);
import 'element-plus/dist/index.css'
document.title = config.siteTitle
const app = createApp(App)

app.use(store)
app.use(router)

useIcons(app)

app.mount('#app')
