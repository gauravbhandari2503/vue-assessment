import { createRouter, createWebHistory } from 'vue-router'

const DynamicForm = () => import('../views/DynamicForm.vue')
const Listing = () => import('../views/Listing.vue')
const NotFound = () => import('../views/NotFound.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DynamicForm
    },
    {
      path: '/listing',
      name: 'listing',
      component: Listing
    },
    { path: '/:pathMatch(.*)', 
      name: 'not-found',
      component: NotFound 
    }
  ]
})

export default router
