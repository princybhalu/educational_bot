import http from 'services/http';

export const createChatTrackerId = async () => {
  return http.post({
    url: '/chat-service/chat-tracker',
    messageSettings: { hideSuccessMessage: true },
  });
};

export const getChatByChatTrackerId = async (chatTrackerId: string) => {
  return http.get({
    url: '/scheduler-service/task-chat-tracker/' + chatTrackerId,
    messageSettings: { hideSuccessMessage: true },
  });
};
