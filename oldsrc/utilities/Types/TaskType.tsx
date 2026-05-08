export type TaskType = {
  id: number;
  title: string;
  description_short: string;
  description_full: string;
  isCompleted: boolean;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: Date;
  parantId: number
};