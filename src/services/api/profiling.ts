import http from '../http';

export const AskQuetionApiCall = (body : any) => {
  return http.post({
    url: '/knowledge-base-service/psychological-profie/ask-question',
    data: body,
    messageSettings: { hideSuccessMessage: true },
  });
};
