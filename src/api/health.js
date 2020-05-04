import request from '@/utils/request';

export function submitHealth(
  {
    userId, createTime, height, weight, waistline, hipline, chest, water, sleep, defecation,
  },
) {
  return request({
    url: '/health/addHealth',
    method: 'post',
    data: {
      userId, createTime, height, weight, waistline, hipline, chest, water, sleep, defecation,
    },
  });
}

export function getHealth(
  userId, date,
) {
  return request({
    url: '/health/BMI',
    method: 'post',
    data: {
      userId, date,
    },
  });
}
