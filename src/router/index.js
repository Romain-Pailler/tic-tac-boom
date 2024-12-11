import { createRouter, createWebHistory } from 'vue-router'

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
