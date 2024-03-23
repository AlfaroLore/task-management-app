import TaskColumn from 'src/components/molecules/taskColumn/TaskColumn';
import { TaskBoardProps } from './typings';

const TaskBoard = ({ tasks, loadingTasks, errorTasks }: TaskBoardProps) => {
  if (loadingTasks) return <p>Loading...</p>;
  if (errorTasks) return <p>Error fetching data.</p>;

  return (
    <div className="grid grid-cols-5 p-2 text-white gap-2">
      {Object.entries(tasks).map(([status, tasksByStatus]) => (
        <div key={status}>
          <h3 className="mb-4">
            {status}
            {` (${tasksByStatus.length})`}
          </h3>
          <TaskColumn tasks={tasksByStatus} />
        </div>
      ))}
    </div>
  );
};
export default TaskBoard;
