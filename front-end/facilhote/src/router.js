import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: () => import('./views/PageNotFound.vue'),
    },
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('./views/Dashboard.vue'),
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: () => import('./views/Calendar.vue'),
    },
    {
      path: '/client',
      name: 'Client',
      component: () => import('./views/Client.vue'),
    },
  ],
});
