import http from '../http';

export const GetSchedulerListForUserApiCall = () => {
  // res object
  return {
    Status: 'Success',
    data: [
      {
        id: '602e6028-ab52-4fd8-963f-847644cb4d30',
        title: 'Main',
        created_by: '62154c2d-a793-4f98-8f74-bf3ac576fc6f',
        created_at: '2024-10-20T05:33:08.981Z',
        is_active: true,
      },
      {
        id: '602e6028-ab52-4fd8-963f-847644cb4d30',
        title: 'Main',
        created_by: '62154c2d-a793-4f98-8f74-bf3ac576fc6f',
        created_at: '2024-10-20T05:33:08.981Z',
        is_active: false,
      },
    ],
  };

  return http.get({
    url: '/scheduler-service/schedules',
    messageSettings: { hideSuccessMessage: true, hideErrorMessage: true },
  });
};

//  req body : {
//     "is_active": false
// }
export const UpdateStatusOfSchedulerApiCall = (
  body: any,
  schedulerId: string
) => {
  return http.put({
    url: '/scheduler-service/schedule/' + schedulerId,
    data: { update_with: body },
  });
};

// req body : {
//     "schedule_title": "Main",
//     "is_active": true
// }
export const CreateSchedulerApiCall = (body: any) => {
  return http.post({
    url: '/scheduler-service/schedule',
    data: body,
  });
};

export const GetTaskBetweenRangeApiCall = (
  schedulerId: string,
  startDate: string,
  endDate: string
) => {
  return {
    Status: 'Success',
    data: [
      {
        id: 'accc80a1-decf-4a20-868a-ad12d4908d8f',
        schedule_id: '23f0f3cb-a893-4261-9f57-100bd4cb6253',
        title: 'Study Maths Chapter 1',
        created_by: '5808f946-ca84-427e-b325-c5f9532614fa',
        date: '2024-10-19T00:00:00.000Z',
        start_time_utc: '09:00:00',
        end_time_utc: '11:45:00',
        type: 'study',
        meta_data: {
          chapter: '1',
          subject: 'Mathematics',
          topic: '',
        },
      },
    ],
  };
  return http.get({
    url:
      '/scheduler-service/get-tasks-by-range/' +
      schedulerId +
      '?start_date=' +
      startDate +
      '&end_date=' +
      endDate,
    messageSettings: { hideSuccessMessage: true },
  });
};

// req body : {
//     "schedule_id": "a87ba569-12c7-431e-9806-af455ffadc3b",
//     "title": "one",
//     "date": "01/20/2024",
//     "start_time": "9:20:00",
//     "end_time": "9:30:00",
//     "type": "study",
//     "meta_data": {
//          "chapter": "1",
//          "subject": "Mathematics",
//          "topic": ""
//     }
// }
export const AddTaskApiCall = (body: any) => {
  return http.post({
    url: '/scheduler-service/task',
    data: body,
  });
};

// req body : {
//     "schedule_id": "23f0f3cb-a893-4261-9f57-100bd4cb6253",
//     "query": "i will study computer networks day after tommorow at 6 pm to 9 pm"
// }
export const AddTaskByQueryApiCall = (body: any) => {
  return http.post({
    url: '/scheduler-service/task/query',
    data: body,
  });
};

export const RemoveTaskApiCall = (taskId: string) => {
  return http.delete({
    url: '/scheduler-service/task/' + taskId,
  });
};

// TODO : their is not any update api so we can not set rrsize and drop and edit events
export const UpdateTaskApiCall = (body : any , scheduleId : string ) => {
  return http.put({
    url: "/scheduler-service/task/" + scheduleId, 
    data: {
      schedule_id: scheduleId,
      update_with: {
        ...body,
      }
    }
  })
}