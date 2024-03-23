import { CreateTaskInput } from 'src/api/request/typings';

export interface TaskFormProps {
  onSubmit: (taskRequest: CreateTaskInput) => void;
  onClose: () => void;
}
