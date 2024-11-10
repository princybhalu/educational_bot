import http from '../http';

export const AskQuetionApiCall = (body: any) => {
  return {
    Status: 'Success',
    data: {
      profile_data: [
        {
          question_id: '670c8b6617ebc2af3c2ba59f',
          question:
            'What hobbies do you regularly engage in during your free time?',
          ai_response: {
            question:
              'What hobbies do you regularly engage in during your free time?',
            feedback:
              "It's great to hear you're into Valorant! It's such a fun game that really brings out teamwork and strategy. I bet you have some awesome moments in matches!",
          },
          category_key: 'hobby',
          answer: 'i like to play valorant',
          sequence: 1,
        },
        {
          question_id: '670c8b6617ebc2af3c2ba5a0',
          question: 'How do your hobbies help you relax or recharge?',
          ai_response: {
            question:
              'What do you enjoy most about playing Valorant, and do you have a favorite agent?',
            feedback:
              "It's awesome that you enjoy playing Jett! She's such a fun and agile agent with her ability to dash around and take down enemies. Have you tried experimenting with her abilities to outmaneuver opponents?",
          },
          category_key: 'hobby',
          answer: 'well i like to play jett',
          sequence: 2,
        },
        {
          question_id: '670c8b6617ebc2af3c2ba5a1',
          question:
            'Do you prefer to learn through visual aids, hands-on activities, or reading?',
          ai_response: {
            question:
              'What strategies do you use to improve your gameplay with Jett in Valorant?',
            feedback:
              "It's great that you're focusing on aim practice! Jett requires quick reflexes and good positioning, so honing your aiming skills will definitely help you get the most out of her abilities. Keep it up, and try to incorporate some team strategies as well!",
          },
          category_key: 'learning_style',
          answer: 'by aim practice',
          sequence: 3,
        },
        {
          question_id: '670c8b6617ebc2af3c2ba5a2',
          question:
            'When learning new concepts, do you focus more on the details or the overall picture?',
          ai_response: {
            question:
              'What aspects of teamwork do you find most important when playing games like Valorant?',
            feedback:
              "It's awesome that you're focusing on improving your aim with Jett! Practicing together with teammates can really help build that synergy and boost your confidence in tough situations.",
          },
          category_key: 'learning_style',
          answer: 'synergy',
          sequence: 4,
        },
        {
          question_id: '670c8b6617ebc2af3c2ba5a3',
          question:
            'How confident do you feel when approaching challenging academic topics?',
          ai_response: {
            question:
              'How do you approach challenging situations in games like Valorant that require teamwork and strategy?',
          },
          category_key: 'academic_confidence',
          sequence: 5,
        },
      ],
      next_question: {
        question_id: '670c8b6617ebc2af3c2ba5a3',
        question:
          'How confident do you feel when approaching challenging academic topics?',
        category_key: 'academic_confidence',
      },
    },
  };
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

export const GiveDescriptionApiCall = (body: any) => {
  return {
    Status: 'Success',
    data: {
      feedback:
        'Please tell me more about youself, like about your hobby and how you like to learn or your academic journey till now.',
    },
  };
  return http.post({
    url: '/knowledge-base-service/psychological-profie/description',
    data: body,
  });
};
