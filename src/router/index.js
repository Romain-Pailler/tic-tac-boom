import { createRouter, createWebHistory } from 'vue-router';
import { Dashboard, Login, Register } from '../components'; //Attention si bug importer un par un les components
const routes = [
  {path:'/Login',component:Login},
  {path:'/Register',component:Register},
  {path:'/Dashboard',component:Dashboard}
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
