import Cookies from 'js-cookie';

const TokenKey = 'user-token';
const UniqueIdKey = 'user-uniqueId';
// const BalanceKey = 'user-balance';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getUniqueId() {
  return Cookies.get(UniqueIdKey);
}

export function setUniqueId(uniqueId) {
  return Cookies.set(UniqueIdKey, uniqueId);
}

export function removeUniqueId() {
  return Cookies.remove(UniqueIdKey);
}

// export function getBalance() {
//   return Cookies.get(BalanceKey);
// }

// export function setBalance(balance) {
//   return Cookies.set(BalanceKey, balance);
// }

// export function removeBalance() {
//   return Cookies.remove(BalanceKey);
// }
