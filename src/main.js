import Vue from 'vue';
import Element from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';

import './icons';

import './styles/index.scss';
import 'element-ui/lib/theme-chalk/index.css';

import Mixin from './mixins';

Vue.use(Element);
Vue.mixin(Mixin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
