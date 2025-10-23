import 'virtual:svg-icons-register'
import './assets/styles/index.scss'

import { createApp } from 'vue'

import App from './App.vue'
import store from './stores'
import router from './router'
import useIcons from './plugins/use-icons'
import 'element-plus/dist/index.css'
document.title = '权限管理'
const app = createApp(App)

app.use(store)
app.use(router)

useIcons(app)

app.mount('#app')
