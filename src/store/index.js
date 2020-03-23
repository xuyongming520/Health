import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';

import userState from './modules/userState';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userState,
  },
  getters,
});
