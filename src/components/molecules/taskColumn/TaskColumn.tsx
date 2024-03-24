import { Task } from 'src/api/response/typings';
import Card from '../card/Card';
import { useMutation } from '@apollo/client';
import { DELETE_OPTION, EDIT_OPTION, PROFILE_ID } from 'src/utils/constants';
import { DELETE_TASK, GET_TASKS_BY_USER } from 'src/api/gql';

const TaskColumn = ({ tasks }: { tasks: Task[] }) => {
  const [deleteTask] = useMutation(DELETE_TASK);
  const onOptionClick = async (option: string, item: Task) => {
    const profileId = localStorage.getItem(PROFILE_ID);
    if (option === EDIT_OPTION) {
      return;
    }
    if (option === DELETE_OPTION) {
      await deleteTask({
        variables: { input: { id: item.id } },
        refetchQueries: [
          {
            query: GET_TASKS_BY_USER,
            variables: { input: { assigneeId: profileId } },
          },
        ],
      });
    }
  };
  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <Card item={task} key={task.id} onOptionClick={onOptionClick} />
      ))}
    </div>
  );
};

export default TaskColumn;
