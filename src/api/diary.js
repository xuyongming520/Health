import request from '@/utils/request';

export function actionList(id, date, type) {
  return request({
    url: '/health/query',
    method: 'post',
    data: { id, date, type },
  });
}
