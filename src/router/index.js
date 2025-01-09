import Dashboard from '@/components/Dashboard.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import { isAuthenticated } from '@/services/AuthProvider';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {path:'/login',component: Login},
    {path:'/register', name: "Register", component: Register},
    {path:'/dashboard', name:"Dasboard", component: Dashboard, meta: {requiresAuth: true}}
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
  next();
})

export default router
