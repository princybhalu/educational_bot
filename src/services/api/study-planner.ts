import http from '../http';

export const GetSchedulerListForUserApiCall = () => {
  // // res object
  // return {
  //   Status: 'Success',
  //   data: [
  //     {
  //       id: '602e6028-ab52-4fd8-963f-847644cb4d30',
  //       title: 'Main',
  //       created_by: '62154c2d-a793-4f98-8f74-bf3ac576fc6f',
  //       created_at: '2024-10-20T05:33:08.981Z',
  //       is_active: true,
  //     },
  //     {
  //       id: '602e6028-ab52-4fd8-963f-847644cb4d30',
  //       title: 'Main',
  //       created_by: '62154c2d-a793-4f98-8f74-bf3ac576fc6f',
  //       created_at: '2024-10-20T05:33:08.981Z',
  //       is_active: false,
  //     },
  //   ],
  // };

  return http.get({
    url: '/scheduler-service/schedules',
    messageSettings: { hideSuccessMessage: true, hideErrorMessage: true },
  });
};

export const UpdateStatusOfSchedulerApiCall = (
  body: any,
  schedulerId: string
) => {
  return http.put({
    url: '/scheduler-service/schedule/' + schedulerId,
    data: { update_with: body },
  });
};

export const CreateSchedulerApiCall = (body: any) => {
  return http.post({
    url: '/scheduler-service/schedule',
    data: body,
  });
};

export const GetTaskBetweenRangeApiCall = (
  schedulerId: string | null,
  startDate: string,
  endDate: string
) => {
  if (!schedulerId)
    return http.get({
      url:
        '/scheduler-service/get-tasks-by-range?start_date=' +
        startDate +
        '&end_date=' +
        endDate,
      messageSettings: { hideSuccessMessage: true },
    });

  return http.get({
    url:
      '/scheduler-service/get-tasks-by-range/?start_date=' +
      startDate +
      '&end_date=' +
      endDate +
      '&scheduler_id=' +
      schedulerId,
    messageSettings: { hideSuccessMessage: true },
  });
};

export const AddTaskApiCall = (body: any) => {
  return http.post({
    url: '/scheduler-service/task',
    data: body,
  });
};

export const AddTaskByQueryApiCall = (body: any) => {
  return http.post({
    url: '/scheduler-service/task/query',
    data: body,
    messageSettings: { hideSuccessMessage: true },
  });
};

export const RemoveTaskApiCall = (taskId: string) => {
  return http.delete({
    url: '/scheduler-service/task/' + taskId,
  });
};

export const UpdateTaskApiCall = (
  body: any,
  scheduleId: string | null,
  taskId: any
) => {
  const data = {
    update_with: {
      ...body,
    },
  };
  //@ts-ignore
  scheduleId ? (data.schedule_id = scheduleId) : null;
  return http.post({
    url: '/scheduler-service/task/' + taskId,
    data: {
      update_with: {
        ...body,
      },
    },
  });
};

export const AddExamScheduleApiCall = (body: any) => {
  return http.post({
    url: '/scheduler-service/schedule',
    data: body,
  });
};

export const GetSchedulerListForExam = () => {
  return http.get({
    url: '/scheduler-service/schedules',
  });
};
