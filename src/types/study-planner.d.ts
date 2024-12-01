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
