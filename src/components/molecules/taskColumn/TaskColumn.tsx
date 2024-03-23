import { Task } from 'src/api/response/typings';
import Card from '../card/Card';

const TaskColumn = ({ tasks }: { tasks: Task[] }) => (
  <div>
    {tasks.map((task) => (
      <Card item={task} key={task.id} />
    ))}
  </div>
);

export default TaskColumn;
