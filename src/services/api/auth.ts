import http from '../http';

export const LoginApiCall = (body: any) => {
  return http.post({
    url: '/user-service/login',
    data: body,
    messageSettings: { successMessage: 'Login Successfully' },
  });
};

export const RegisterApiCall = (body: any) => {
  return http.post({
    url: '/user-service/user',
    data: body,
    messageSettings: { successMessage: 'Register Successfully' },
  });
};

export const GetOAuthUrlApiCall = () => {
  return http.get({
    url: '/user-service/get-oauth-url',
    messageSettings: { hideSuccessMessage: true },
  });
};
