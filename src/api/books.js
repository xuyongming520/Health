import request from '@/utils/request';

export function queryList({
  limit, page, status, infoId,
}) {
  return request({
    url: '/books/list',
    method: 'post',
    data: {
      limit, page, status, infoId,
    },
  });
}
