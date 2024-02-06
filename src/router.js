import { createRouter, createWebHistory } from 'vue-router';

import Cart from '@views/Cart.vue';
import History from '@views/History.vue'
import Login from '@views/Login.vue';
import NotFound from '@views/NotFound.vue';
import Product from '@views/Product.vue';
import Register from '@views/Register.vue';
import Settings from '@views/Settings.vue';
import Shop from '@views/Shop.vue';
import WishList from '@views/WishList.vue'

const routes = [
  { path: '/', redirect: { path: '/shop' } },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/shop', component: Shop },
  { path: '/wishlist', component: WishList },
  { path: '/history', component: History },
  { path: '/cart', component: Cart },
  { path: '/settings', component: Settings },
  {
    path: '/product',
    children: [
      { path: '', redirect: { path: `/shop` } },
      { path: ':id', component: Product },
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
