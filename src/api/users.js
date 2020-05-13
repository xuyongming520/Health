// FIXME:该文件为示例文件，请及时修改或者删除
import request from '@/utils/request';

export function register({
  phone, password, name, email, address, age, sex,
}) {
  return request({
    url: '/user/register',
    method: 'post',
    data: {
      phone,
      password,
      name,
      email,
      address,
      age,
      sex,
    },
  });
}

export function login(phone, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      phone,
      password,
    },
  });
}

export function userInfo(phone) {
  return request({
    url: '/user/selectUserByPhone',
    method: 'get',
    params: { phone },
  });
}

export function recharge(balance, userId) {
  return request({
    url: '/user/updateBalance',
    method: 'post',
    data: { balance, userId },
  });
}
