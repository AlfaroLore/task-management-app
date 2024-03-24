import { Task } from 'src/api/response/typings';

export interface CardProps {
  item: Task;
  onOptionClick: (option: string, item: Task) => void;
}
