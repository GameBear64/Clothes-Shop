import { createRouter, createWebHistory } from 'vue-router';

import NotFound from '@views/NotFound.vue';

const routes = [
  { path: '/', redirect: { path: '/shop' } },
  { path: '/shop', component: () => import('@views/Shop.vue') },
  { path: '/login', component: () => import('@views/Login.vue') },
  { path: '/register', component: () => import('@views/Register.vue') },
  { path: '/wishlist', component: () => import('@views/WishList.vue') },
  { path: '/history', component: () => import('@views/History.vue') },
  { path: '/cart', component: () => import('@views/Cart.vue') },
  { path: '/settings', component: () => import('@views/Settings.vue') },
  {
    path: '/product',
    children: [
      { path: '', redirect: { path: `/shop` } },
      { path: ':id', component: () => import('@views/Product.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'border-b border-primary',
  routes,
});

router.beforeEach((to, from, next) => {
  const noAuthPage = ['/login', '/register'].includes(to.path);
  const loggedIn = localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_NAME);

  if (noAuthPage || loggedIn) next();
  else next('/login');
});

export default router;
