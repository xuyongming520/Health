// FIXME:该文件为示例文件，请及时修改或者删除
import request from '@/utils/request';

export function register({
  phone, password, name, email,
}) {
  return request({
    url: '/user/register',
    method: 'post',
    data: {
      phone,
      password,
      name,
      email,
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

export function recharge(balance) {
  return request({
    url: '/users/balance',
    method: 'post',
    data: { balance },
  });
}
// export function changePassword(oldPassword, newPassword) {
//   return request({
//     url: '/users',
//     method: 'patch',
//     data: {
//       password: oldPassword,
//       repassword: newPassword,
//     },
//   });
// }

// export function userInfo() {
//   return request({
//     url: '/users',
//     method: 'get',
//   });
// }

// export function updateUserInfo(info) {
//   return request({
//     url: '/users/modified',
//     method: 'post',
//     data: info,
//   });
// }

// export function wallet() {
//   return request({
//     url: '/users/payment',
//     method: 'get',
//   });
// }

// export function payment(money) {
//   return request({
//     url: '/users/payment',
//     method: 'post',
//     data: {
//       money,
//     },
//   });
// }
