import HomeView from '../pages/home.vue';
import LoginView from '../pages/login.vue';
import TesteView from '../pages/teste.vue';
import RegisterView from '../pages/register.vue';
import RedefinirView from '../pages/redefinir.vue';
import authMiddleware from '@/middleware/authMiddleware'; // Importe o middleware
import TelaView from '../pages/tela.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: HomeView, beforeEnter: authMiddleware, },
  { path: '/login', component: LoginView },
  { path: '/redefinir', component: RedefinirView },
  { path: '/teste', component: TesteView },
  { path: '/register', component: RegisterView },
  { path: '/tela', component: TelaView },


]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})

export default router;