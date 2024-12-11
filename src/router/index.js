import Dashboard from '@/components/Dashboard.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {path:'/login',component: Login},
    {path:'/register',component: Register},
    {path:'/dashboard',component: Dashboard}
    ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
