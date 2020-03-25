import request from '@/utils/request';

export function query(id) {
  return request({
    url: '/books/class/detail',
    method: 'get',
    params: {
      id,
    },
  });
}

export function queryList() {
  return request({
    url: '/books/class/list',
    method: 'post',
    data: {
      page: 1,
      limit: 100,
      name: null,
    },
  });
}
