export interface QuestionsTypes {
  question_id: string;
  category_key: string;
  question: string;
  sequence: number;
  answer?: string;
  ai_response?: {
    question?: string;
    feedback?: string;
  };
  status?: string;
}
