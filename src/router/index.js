import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/activity/:id',
      name: 'activity',
      component: () => import('../views/ActivityView.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
