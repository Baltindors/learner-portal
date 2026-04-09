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
    },
    {
      path: '/activity/:id/info',
      name: 'activity-frontmatter',
      component: () => import('../views/ActivityFrontmatter.vue')
    },
    {
      path: '/center/:name',
      name: 'center',
      component: () => import('../views/CenterView.vue') 
    },
    {
      path: '/your-center',
      name: 'your-center',
      component: () => import('../views/YourCenterView.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  const isCustomHomepage = localStorage.getItem('isCustomHomepage') === 'true';
  if (to.path === '/' && isCustomHomepage) {
    next({ name: 'your-center' });
  } else {
    next();
  }
});

export default router