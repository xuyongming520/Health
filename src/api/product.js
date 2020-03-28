import request from '@/utils/request';

export function queryList({
  limit, page, name, classId,
}) {
  return request({
    url: '/product/selectProductList',
    method: 'post',
    data: {
      pageSize: limit, currentPage: page, name, classId,
    },
  });
}

export function query(id) {
  return request({
    url: '/product/selectProduct',
    method: 'get',
    params: { productId: id },
  });
}
