export interface ChatLogsType {
  [x: string]: any;
  role: 'user' | 'assistant';
  content: string;
}
