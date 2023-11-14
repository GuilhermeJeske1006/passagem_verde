import HomeView from '../pages/home.vue';
import LoginView from '../pages/login.vue';

import RedefinirView from '../pages/redefinir.vue';
import authMiddleware from '@/middleware/authMiddleware'; // Importe o middleware

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: HomeView, beforeEnter: authMiddleware, },
  { path: '/login', component: LoginView },
  { path: '/redefinir', component: RedefinirView },


]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})

export default router;