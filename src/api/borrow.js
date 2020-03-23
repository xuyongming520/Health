import request from '@/utils/request';

export function queryList({ limit, page, userId }) {
  return request({
    url: '/books/lend/record',
    method: 'post',
    data: {
      limit,
      page,
      userId,
    },
  });
}

export function borrow(id, infoId) {
  console.log(infoId);
  return request({
    url: '/books/lend',
    method: 'post',
    data: {
      booksId: id,
      pkId: infoId,
    },
  });
}

export function reLend(pkId) {
  return request({
    url: '/books/lend/relend',
    method: 'post',
    data: {
      pkId,
    },
  });
}

export function sendBack(pkId) {
  return request({
    url: '/books/lend',
    method: 'put',
    data: {
      pkId,
      isReturn: 1,
    },
  });
}

export function chart() {
  return request({
    url: '/books/lend/statistic',
    method: 'post',
    data: { year: 2019 },
  });
}
