import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Layout from '@/views/layout/layout.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '',
      component: Layout,
      redirect: '/homepage',
      children: [
        {
          path: '/homepage',
          name: 'homepage',
          meta: {
            title: 'Health',
          },
          component: () => import('@/views/homepage/index.vue'),
        },
      ],
    },
    {
      path: '/mall',
      component: Layout,
      redirect: '/mall',
      children: [
        {
          path: '/mall',
          name: 'mall',
          meta: {
            title: '健康商城',
          },
          component: () => import('@/views/mall/index.vue'),
        },
      ],
    },
    {
      path: '/car',
      component: Layout,
      redirect: '/car',
      children: [
        {
          path: '/car',
          name: 'car',
          meta: {
            title: '购物车',
          },
          component: () => import('@/views/car/index.vue'),
        },
      ],
    },
    {
      path: '/mine',
      component: Layout,
      redirect: '/mine',
      children: [
        {
          path: '/mine',
          name: 'mine',
          meta: {
            title: '我的',
          },
          component: () => import('@/views/mine/index.vue'),
        },
      ],
    },
    {
      path: '/proDetail',
      component: Layout,
      redirect: '/proDetail/index.vue',
      children: [
        {
          path: '/proDetail/index/:id',
          name: 'proDetail',
          meta: {
            title: '商品详情',
          },
          component: () => import('@/views/proDetail/index.vue'),
        },
      ],
    },
    {
      path: '/account',
      component: Layout,
      redirect: '/account/login',
      children: [
        {
          path: '/account/login',
          name: 'login',
          meta: {
            title: '登录',
          },
          component: () => import('@/views/account/login.vue'),
        },
        {
          path: '/account/register',
          name: 'register',
          meta: {
            title: '注册',
          },
          component: () => import('@/views/account/register.vue'),
        },
      ],
    },
  ],
});

/**
 * 顶部进度条样式
 */
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});

/**
 * 路由前置检查
 */
router.beforeEach((to, from, next) => {
  NProgress.start();// 每次切换页面时，调用进度条
  document.title = to.meta.title;// 页面标题
  // 合法性校验
  if (to.meta.auth) {
    console.log('into auth');
    next();
  }
  next();
});
router.afterEach(() => {
  // 在即将进入新的页面组件前操作
  NProgress.done();// 在即将进入新的页面组件前，关闭掉进度条
});

export default router;
