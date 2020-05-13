import request from '@/utils/request';

export function actionList(id, date, type) {
  return request({
    url: '/health/query',
    method: 'post',
    data: { id, date, type },
  });
}

export function submitFood(id, date, type, foods) {
  return request({
    url: '/health/diet',
    method: 'post',
    data: {
      id, date, type, foods,
    },
  });
}
