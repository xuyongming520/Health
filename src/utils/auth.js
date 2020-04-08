import Cookies from 'js-cookie';

const PhoneKey = 'user-phone';

export function getPhone() {
  return Cookies.get(PhoneKey);
}

export function setPhone(phone) {
  return Cookies.set(PhoneKey, phone);
}

export function removePhone() {
  return Cookies.remove(PhoneKey);
}
