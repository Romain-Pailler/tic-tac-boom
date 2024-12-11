import Dashboard from '@/components/Dashboard.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {path:'/Login',component: Login},
    {path:'/Register',component: Register},
    {path:'/Dashboard',component: Dashboard}
    ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
