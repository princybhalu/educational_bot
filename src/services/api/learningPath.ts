import http from '../http';

export const GetAllSubjects = () => {
  return http.get({
    url: '/resources-directory-service/subjects',
    messageSettings: { hideSuccessMessage: true },
  });
};

export const GetChapterListBySubjectId = (subjectId: string) => {
  return http.get({
    url: '/resources-directory-service/subjects/' + subjectId,
    messageSettings: { hideSuccessMessage: true },
  });
};

export const CreateProgrssApiCall = (body: any) => {
  return http.post({
    url: '/user-service/progress/',
    data: body,
    messageSettings: { hideSuccessMessage: true, hideErrorMessage: true },
  });
};

export const GetProgressApiCall = (topicId: string) => {
  return http.get({
    url: '/user-service/progress/' + topicId,
    messageSettings: { hideSuccessMessage: true },
  });
};

export const ChatApiCall = (body: any, relevantId: string) => {
  return http.post({
    url: '/user-service/chat/' + relevantId,
    data: body,
    messageSettings: { hideSuccessMessage: true },
  });
};
