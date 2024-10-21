import http from '../http';

export const AskQuetionApiCall = (body: any) => {
  if (!body) {
    return http.post({
      url: '/knowledge-base-service/psychological-profie/ask-question',
      // data: {},
      messageSettings: { hideSuccessMessage: true },
    });
  }
  return http.post({
    url: '/knowledge-base-service/psychological-profie/ask-question',
    data: body,
    messageSettings: { hideSuccessMessage: true },
  });
};

export const GetAllQuestionListApiCall = () => {
  return http.get({
    url: '/knowledge-base-service/questions',
    messageSettings: { hideErrorMessage: true, hideSuccessMessage: true },
  });
};

export const CreateProfileApiCall = (userId: string) => {
  return http.post({
    url: '/knowledge-base-service/psychological-profie',
    config: {
      headers: {
        'x-user-id': userId,
      },
    },
  });
};
