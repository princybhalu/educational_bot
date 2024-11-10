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

export interface OrbitProps {
  opration: 'loading' | 'loading1' | null;
  size?: number;
  colors?: string[];
}

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  isVisible: boolean;
}

export interface TypingAnimtionCardProps {
  text: string;
  isVisible: boolean;
  onTypingComplete: () => void;
  className?: string;
  message: string;
}
