import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('./views/Dashboard.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('./views/Profil.vue'),
      meta: {
        requiresAuth: true,
        // is_admin: true,
        // guest: true,
      },
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: () => import('./views/Calendar.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/client',
      name: 'Client',
      component: () => import('./views/Client.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: () => import('./views/PageNotFound.vue'),
    },
  ],
});

export default router;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['users/isLoggedIn']) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});
