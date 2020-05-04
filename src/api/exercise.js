import request from '@/utils/request';

export function exerciseList(name) {
  return request({
    url: '/exercise/exerciseList',
    method: 'post',
    data: { name },
  });
}
