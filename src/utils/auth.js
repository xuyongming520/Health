import Cookies from 'js-cookie';

const PhoneKey = 'user-phone';
const UserIdKey = 'user-userId';

export function getPhone() {
  return Cookies.get(PhoneKey);
}

export function setPhone(phone) {
  return Cookies.set(PhoneKey, phone);
}

export function removePhone() {
  return Cookies.remove(PhoneKey);
}

export function getUserId() {
  return Cookies.get(UserIdKey);
}

export function setUserId(userId) {
  return Cookies.set(UserIdKey, userId);
}

export function removeUserId() {
  return Cookies.remove(UserIdKey);
}
