import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueScreen from 'vue-screen'

createApp(App).use(router).use(store).use(VueScreen).mount('#app')
