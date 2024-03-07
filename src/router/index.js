import HomeView from '../pages/home.vue';
import LoginView from '../pages/login.vue';
import RegisterView from '../pages/register.vue';
// import RedefinirView from '../pages/redefinir.vue';
import authMiddleware from '@/middleware/authMiddleware'; // Importe o middleware
import PrimeiroAcessoView from '../pages/primeiro-acesso'

import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/', component: HomeView, beforeEnter: authMiddleware, },
  { path: '/login', component: LoginView },
  // { path: '/redefinir', component: RedefinirView },
  { path: '/register', component: RegisterView },
  { path: '/definir-senha', component: PrimeiroAcessoView },


];

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

export default router;