import { Task } from 'src/api/response/typings';

export interface TaskBoardProps {
  tasks: { [key: string]: Task[] };
  loadingTasks: boolean;
  errorTasks: string | null;
}
