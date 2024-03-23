import {
  ListBulletIcon,
  PlusIcon,
  TableCellsIcon,
} from '@heroicons/react/16/solid';
import { useState } from 'react';
import IconButton from 'src/components/atoms/iconButton/IconButton';
import cx from 'classnames';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import TaskBoard from 'src/components/organisms/taskBoard/TaskBoard';
import { Status, Task } from 'src/api/response/typings';

const GET_PROFILE = gql`
  query GetUser {
    profile {
      id
      fullName
    }
  }
`;

const GET_TASKS_BY_USER = gql`
  query GetTasks($input: FilterTaskInput!) {
    tasks(input: $input) {
      id
      name
      dueDate
      pointEstimate
      position
      status
      tags
    }
  }
`;

function Dashboard() {
  const [isGridView, setIsGridView] = useState<boolean>(false);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(false);
  const [errorTasks, setErrorTasks] = useState<string | null>(null);
  const [tasks, setTasks] = useState<{ [key: string]: Task[] } | null>(null);
  const [getTasks] = useLazyQuery(GET_TASKS_BY_USER);

  const { loading: loadingProfile, error: errorProfile } = useQuery(
    GET_PROFILE,
    {
      onCompleted: async (queryData) => {
        setLoadingTasks(true);
        setErrorTasks(null);

        try {
          const statuses = Object.values(Status).filter(
            (value) => typeof value === 'string'
          );

          const tasksByStatus: { [key: string]: Task[] } = {};

          const { data } = await getTasks({
            variables: {
              input: { assigneeId: queryData.profile.id },
            },
          });

          const fetchedTasks = data.tasks;

          for (const status of statuses) {
            tasksByStatus[status] = fetchedTasks.filter(
              (task: Task) => task.status === status
            );
          }

          setTasks(tasksByStatus);
        } catch (error) {
          setErrorTasks('error');
        } finally {
          setLoadingTasks(false);
        }
      },
    }
  );

  if (loadingProfile || loadingTasks) return <p>Loading...</p>;
  if (errorProfile || errorTasks) return <p>Error fetching data.</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between p-2">
        <div className="flex gap-x-2">
          <IconButton
            variant={isGridView ? 'outlined' : 'default'}
            onClick={() => {
              setIsGridView(true);
            }}
          >
            <TableCellsIcon
              className={cx('h-5 w-5', { 'text-primary4': isGridView })}
              aria-hidden="true"
            />
          </IconButton>
          <IconButton
            variant={!isGridView ? 'outlined' : 'default'}
            onClick={() => {
              setIsGridView(false);
            }}
          >
            <ListBulletIcon
              className={cx('h-5 w-5', { 'text-primary4': !isGridView })}
              aria-hidden="true"
            />
          </IconButton>
        </div>
        <IconButton variant="filled">
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </IconButton>
      </div>
      <>
        {tasks ? (
          <TaskBoard
            tasks={tasks}
            loadingTasks={loadingTasks}
            errorTasks={errorTasks}
          />
        ) : (
          <p>No tasks to display.</p>
        )}
      </>
    </div>
  );
}

export default Dashboard;
