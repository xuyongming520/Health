import request from '@/utils/request';

export function carList(userId) {
  return request({
    url: '/shoppingcart/selectShoppingCartList',
    method: 'post',
    data: {
      userId,
    },
  });
}

export function addCar(proId, userId, number, total) {
  return request({
    url: '/shoppingcart/addShoppingCart',
    method: 'post',
    data: {
      proId, userId, number, total,
    },
  });
}

export function deleteCar(carId) {
  return request({
    url: '/shoppingcart/deleteCar',
    method: 'delete',
    params: {
      carId,
    },
  });
}
