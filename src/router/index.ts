import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/sport-types',
    name: 'SportTypes',
    component: () => import('@/views/SportTypes/index.vue'),
  },
  {
    path: '/sport-types/:sportType',
    name: 'SportType',
    component: () => import('@/views/SportTypes/SportType/index.vue'),
  },
  {
    path: '/sport-types/:sportType/countries/:country',
    name: 'Country',
    component: () => import('@/views/SportTypes/SportType/Countries/Country/index.vue'),
  },
  {
    path: '/sport-types/:sportType/countries/:country/championships',
    name: 'Championships',
    component: () => import('@/views/SportTypes/SportType/Countries/Country/Championships/index.vue'),
  },
  {
    path: '/sport-types/:sportType/countries/:country/championships/:championship',
    name: 'Championship',
    component: () => import('@/views/SportTypes/SportType/Countries/Country/Championships/Championship/index.vue'),
  },
  {
    path: '/quotes/:quote',
    name: 'Quote',
    component: () => import('@/views/QuoteView.vue'),
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})
router.beforeEach((to, _, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    localStorage.setItem('redirectedFrom', to.fullPath);
    next('/login');
  } else {
    next();
  }
});

export default router;