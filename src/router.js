import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    name: 'login',
    component: () => import('./view/login'),
    meta: {
      title: '登录/注册'
    }
  },
  {
    name: 'user',
    component: () => import('./view/user'),
    meta: {
      title: '用户中心'
    }
  },
  {
    name: 'home',
    component: () => import('./view/home'),
    meta: {
      title: '首页',
      keepAlive: true // 标识Home组件需要缓存
    }
  },
  {
    name: 'video',
    component: () => import('./view/video'),
    meta: {
      title: '视频播放'
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
