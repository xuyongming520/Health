// FIXME:该文件为示例文件，请及时修改或者删除
import * as auth from '@/utils/auth';
import * as users from '@/api/users';

const login = {
  state: {
    phone: auth.getPhone(),
    userId: auth.getUserId(),
    // balance: auth.getBalance(),
  },
  mutations: {
    SET_PHONE(state, phone) {
      state.phone = phone;
    },
    SET_USERID(state, userId) {
      state.userId = userId;
    },
  },
  actions: {
    login({ commit }, data) {
      return new Promise((resolve) => {
        users.login(data.phone, data.password)
          .then((res) => {
            switch (res.data.code) {
              case 0:
                auth.setPhone(res.data.data.phone);
                commit('SET_PHONE', true);
                auth.setUserId(res.data.data.id);
                commit('SET_USERID', res.data.data.id);
                resolve('0');
                break;
              case 1:
                resolve('1');
                this.$message.error('该账号还未注册');
                break;
              case 2:
                resolve('2');
                this.$message.error('账号密码错误');
                break;
              default:
                break;
            }
          });
      });
    },
    getPhone({ commit }, data) {
      auth.setPhone(data.phone);
      commit('SET_PHONE', data.phone);
    },
    getUserId({ commit }, data) {
      auth.setUserId(data.id);
      commit('SET_USERID', data.id);
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('SET_PHONE', null);
        commit('SET_USERID', null);
        auth.removePhone();
        auth.removeUserId();
        resolve();
      });
    },
  },
};

export default login;
