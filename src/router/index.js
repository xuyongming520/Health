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
            title: '图书管理系统',
          },
          component: () => import('@/views/homepage/index.vue'),
        },
      ],
    },
    {
      path: '/search',
      component: Layout,
      redirect: '/search/index.vue',
      children: [
        {
          path: '/search/index',
          name: 'search',
          meta: {
            title: '书目搜索',
          },
          component: () => import('@/views/search/index.vue'),
        },
      ],
    },
    {
      path: '/classify',
      component: Layout,
      redirect: '/classify/index.vue',
      children: [
        {
          path: '/classify/index',
          name: 'classify',
          meta: {
            title: '分类浏览',
          },
          component: () => import('@/views/classify/index.vue'),
        },
      ],
    },
    {
      path: '/library',
      component: Layout,
      redirect: '/library/index.vue',
      children: [
        {
          path: '/library/index',
          name: 'library',
          meta: {
            title: '我的图书馆',
          },
          component: () => import('@/views/library/index.vue'),
        },
      ],
    },
    {
      path: '/bookDetail',
      component: Layout,
      redirect: '/bookDetail/index.vue',
      children: [
        {
          path: '/bookDetail/index/:id',
          name: 'bookDetail',
          meta: {
            title: '图书详情',
          },
          component: () => import('@/views/bookDetail/index.vue'),
        },
      ],
    },
    {
      path: '/user',
      component: Layout,
      redirect: '/user/index.vue',
      children: [
        {
          path: '/user/index',
          name: 'user',
          meta: {
            title: '用户信息',
          },
          component: () => import('@/views/user/index.vue'),
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
