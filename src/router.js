import Vue from 'vue';
import VueRouter from 'vue-router';
import { patchGlobalConfig } from './services';

const { globalConfig } = window;
console.log('globalConfig', globalConfig);

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: globalConfig.router.base,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./pages/Home/Home.vue'),
    },
    {
      path: '/portal',
      name: 'portal',
      component: () => import('./pages/Portal/index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/Login/Login.vue'),
    },
    {
      path: '/:spaceId?/app/!/:module/:appId',
      name: 'appView',
      props: true,
      component: () => import('./pages/Default/View/DefaultAppView.vue'),
    },
    {
      path: '/:spaceId?/application/!/:module/:appId',
      name: 'appView',
      props: true,
      component: () => import('./pages/Default/View/DefaultAppView.vue'),
    },
    {
      path: '/:spaceId?/lego-app-form',
      name: 'appForm',
      props: route => Object.assign({}, route.query, route.params),
      component: () => import('./pages/Default/Form/DefaultAppForm.vue'),
    },
  ],
});

router.beforeEach(async (to, _, next) => {
  if (to.query.appName) {
    document.title = to.query.appName;
  }
  if (to.matched.some(route => route.meta.requiresAuth === false)) {
    next();
  } else {
    const { token } = to.query;
    const status = await patchGlobalConfig(token);
    const isToLoginPage = to.name === 'login';
    if (status === 401) {
      if (isToLoginPage) {
        next();
      } else {
        next('/login');
      }
    } else if (isToLoginPage) {
      next('/');
    } else {
      next();
    }
  }
});

export default router;
