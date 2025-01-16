import Dashboard from '@/components/Dashboard.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Profil from '@/components/Profil.vue';
import { isAuthenticated } from '@/services/AuthProvider';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {path:'/login',component: Login, meta: {requiresGuest: true}},
    {path:'/register', name: "Register", component: Register, meta: {requiresGuest: true}},
    {path:'/dashboard', name:"Dasboard", component: Dashboard, meta: {requiresAuth: true}},
    {path:'/profil',name:"Profil", component: Profil, meta: {requiresAuth: true}}
    ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  const isLogged = isAuthenticated();
  if(to.meta.requiresAuth && !isLogged){
    return next('/login');
  }
  if(to.meta.requiresGuest && isLogged){
    return next('/dashboard');
  }
  next();
})

export default router
