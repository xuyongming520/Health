import request from '@/utils/request';

export function foodList(name) {
  return request({
    url: '/food/foodList',
    method: 'post',
    data: { name },
  });
}
