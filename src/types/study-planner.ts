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
}
