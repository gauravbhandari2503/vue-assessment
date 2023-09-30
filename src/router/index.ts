import { createRouter, createWebHistory } from 'vue-router'


const DynamicForm = () => import('../views/DynamicForm.vue');
const Listing = () => import('../views/Listing.vue');


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
  ]
})

export default router
