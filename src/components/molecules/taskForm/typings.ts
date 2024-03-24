import { CreateTaskInput } from 'src/api/request/typings';
import { Task } from 'vitest';

export interface TaskFormProps {
  task?: Task;
  onSubmit: (taskRequest: CreateTaskInput) => void;
  onClose: () => void;
}
