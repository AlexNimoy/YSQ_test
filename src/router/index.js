import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'
import Result from '../views/Result.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/test', component: Test },
  { path: '/result', component: Result },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
