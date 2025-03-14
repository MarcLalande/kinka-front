// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Bot from '../views/botDetails.vue'
import Todo from '../views/taskManager.vue'

const routes = [
  { path: '/bot', component: Bot },
  { path: '/todo', component: Todo },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
