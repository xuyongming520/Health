// FIXME:该文件为示例文件，请及时修改或者删除
import * as auth from '@/utils/auth';
import * as users from '@/api/users';

const login = {
  state: {
    phone: auth.getPhone(),
    // balance: auth.getBalance(),
  },
  mutations: {
    SET_PHONE(state, phone) {
      state.phone = phone;
    },
    // SET_BALANCE(state, balance) {
    //   state.balance = balance;
    // },
  },
  actions: {
    login({ commit }, data) {
      return new Promise((resolve) => {
        users.login(data.phone, data.password)
          .then((res) => {
            console.log(0);
            switch (res.data.code) {
              case 0:
                console.log(12);
                console.log(res.data);
                auth.setPhone(res.data.data);
                commit('SET_PHONE', true);
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
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('SET_PHONE', null);
        auth.removePhone();
        resolve();
      });
    },
  },
};

export default login;
