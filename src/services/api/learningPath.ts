import http from '../http';

export const GetAllSubjects = () => {
  return {
    "Status": "Success",
    "data": [
        {
            "id": "3e60b4b4-5934-4f72-bf96-37cd02b78c95",
            "subject_name": "Computer Network",
            "board": "University",
            "field": "Information Technology",
            "semester": "5",
            "chapter_ids": [
                "b7b8e9df-c44c-4f72-bf96-37cd02b78c95",
                "c8c9f0ef-d55d-4f73-bf97-38de03c89d06",
                "d9dae0ff-d66e-4f74-bf98-39ef04d9e117",
                "e0ebf1ff-d77f-4f75-bf99-40ff05e0f228",
                "f9c82e50-cd6f-4535-bdf3-d67c4cf14b65"
            ]
        }
    ]
}
  return http.get({
    url: '/resources-directory-service/subjects',
    messageSettings: { hideSuccessMessage: true },
  });
};

export const GetChapterListBySubjectId = (subjectId: string) => {
  return {
    "Status": "Success",
    "data": [
        {
            "id": "b7b8e9df-c44c-4f72-bf96-37cd02b78c95",
            "subject_id": "3e60b4b4-5934-4f72-bf96-37cd02b78c95",
            "chapter_name": "Unit-1: Introduction to Computer Networks and Internet",
            "topic_ids": [
                {
                    "id": "c403512e-453e-4fe0-bae7-6f4426f8a0eb",
                    "subject_id": "3e60b4b4-5934-4f72-bf96-37cd02b78c95",
                    "chapter_id": "b7b8e9df-c44c-4f72-bf96-37cd02b78c95",
                    "topic_name": "Understanding of network and Internet"
                },
                {
                    "id": "4e5eec59-7871-496e-8d49-f902e4b49a2b",
                    "subject_id": "3e60b4b4-5934-4f72-bf96-37cd02b78c95",
                    "chapter_id": "b7b8e9df-c44c-4f72-bf96-37cd02b78c95",
                    "topic_name": "The network edge"
                },
                {
                    "id": "898b50fe-bb60-43b4-a7f9-f87234f8d4a1",
                    "subject_id": "3e60b4b4-5934-4f72-bf96-37cd02b78c95",
                    "chapter_id": "b7b8e9df-c44c-4f72-bf96-37cd02b78c95",
                    "topic_name": "The network core"
                },
                {
                    "id": "b0195a4d-92e7-4c87-95a4-e045a75c7b89",
                    "subject_id": "3e60b4b4-5934-4f72-bf96-37cd02b78c95",
                    "chapter_id": "b7b8e9df-c44c-4f72-bf96-37cd02b78c95",
                    "topic_name": "Understanding of Delay, Loss and Throughput in the packet-switching network"
                },
                {
                    "id": "7b9ec345-1e54-4344-991e-5e6b23a58736",
                    "subject_id": "3e60b4b4-5934-4f72-bf96-37cd02b78c95",
                    "chapter_id": "b7b8e9df-c44c-4f72-bf96-37cd02b78c95",
                    "topic_name": "Protocols layers and their service model"
                },
                {
                    "id": "5ec6da24-9a1d-40d5-8662-bf052534d6dc",
                    "subject_id": "3e60b4b4-5934-4f72-bf96-37cd02b78c95",
                    "chapter_id": "b7b8e9df-c44c-4f72-bf96-37cd02b78c95",
                    "topic_name": "History of the computer network"
                }
            ]
        }
    ]
}
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
