import { TaskTag } from '../response/typings';

export interface CreateTaskInput {
  assigneeId: string;
  dueDate: string;
  name: string;
  pointEstimate: string;
  status: string;
  tags: TaskTag[];
}
