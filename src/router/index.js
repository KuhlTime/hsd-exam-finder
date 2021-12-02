import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      showBackButton: false
    }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
