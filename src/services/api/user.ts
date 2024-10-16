import http from '../http';

export const BasicInfoApiCall = (body: any) => {
  return http.patch({
    url: '/user-service/user',
    data: body,
  });
};
