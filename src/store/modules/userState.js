// FIXME:该文件为示例文件，请及时修改或者删除
import * as auth from '@/utils/auth';
import * as users from '@/api/users';

const login = {
  state: {
    isLogin: !!auth.getToken(),
    uniqueId: auth.getUniqueId(),
    // balance: auth.getBalance(),
  },
  mutations: {
    SET_ISLOGIN(state, isLogin) {
      state.isLogin = isLogin;
    },
    SET_UNIQUEID(state, uniqueId) {
      state.uniqueId = uniqueId;
    },
    // SET_BALANCE(state, balance) {
    //   state.balance = balance;
    // },
  },
  actions: {
    login({ commit }, data) {
      return new Promise((resolve) => {
        users.login(data.uniqueId, data.password)
          .then((res) => {
            switch (res.data.code) {
              case 0:
                resolve('0');
                this.$message.error('账号密码错误');
                break;
              case 1:
                auth.setToken(res.data.data);
                commit('SET_ISLOGIN', true);
                resolve('1');
                break;
              default:
                break;
            }
          });
      });
    },
    getUniqueId({ commit }, data) {
      auth.setUniqueId(data.uniqueId);
      commit('SET_UNIQUEID', data.uniqueId);
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('SET_ISLOGIN', false);
        commit('SET_UNIQUEID', null);
        auth.removeToken();
        auth.removeUniqueId();
        resolve();
      });
    },
  },
};

export default login;
