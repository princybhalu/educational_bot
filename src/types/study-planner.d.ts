export interface EventOFCalender {
  id: string;
  schedule_id: string;
  title: string;
  created_by: string;
  date: string; // ISO format date
  start_time_utc: string; // "HH:mm:ss" format
  end_time_utc: string; // "HH:mm:ss" format
  //@ts-ignore
  type: string; // e.g., "study", "meeting", etc.
  meta_data: {
    chapter?: string;
    subject?: string;
    topic?: string; // Optional field
    description?: string;
  };
  start?: string | Date;
  end?: string | Date;
}

export interface DayPlanItem {
  completed?: any;
  id: string;
  schedule_id: string;
  title: string;
  created_by: string;
  date: string;
  start_time_utc: string;
  end_time_utc: string;
  type: string;
  completed?: boolean;
  meta_data: {
    chapter?: string;
    subject?: string;
    topic?: string;
  };
}

export interface Task {
  id: string;
  schedule_id: string;
  title: string;
  created_by: string;
  date: string;
  start_time_utc: string;
  end_time_utc: string;
  type: string; //enusms :  study , test , exam_prepration
  status: string; // enums: upcoming , in_progress , completed , overdue
  meta_data: {
    chapter?: string;
    subject?: string;
    topic?: string;
  };
}
