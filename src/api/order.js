import request from '@/utils/request';

export function queryList({ limit, page, userId }) {
  return request({
    url: '/orders/selectOrdersListByUserId',
    method: 'post',
    data: {
      pageSize: limit, currentPage: page, userId,
    },
  });
}

export function addOrder(
  orderId, proId, userId, number, total, status,
) {
  return request({
    url: '/orders/addOrders',
    method: 'post',
    data: {
      orderId, proId, userId, number, total, status,
    },
  });
}

export function addOrderByCar(orders) {
  return request({
    url: '/orders/addOrdersByCar',
    method: 'post',
    data: {
      orders,
    },
  });
}

export function orderDetailList(orderId) {
  return request({
    url: '/orders/selectOrders',
    method: 'get',
    params: { orderId },
  });
}

export function updateStatus(orderId) {
  return request({
    url: '/orders/updateOrdersStatus',
    method: 'post',
    data: {
      orderId, status: 1,
    },
  });
}
