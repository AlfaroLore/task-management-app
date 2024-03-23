import {
  ListBulletIcon,
  PlusIcon,
  TableCellsIcon,
} from '@heroicons/react/16/solid';
import { useState } from 'react';
import IconButton from 'src/components/atoms/iconButton/IconButton';
import cx from 'classnames';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import TaskBoard from 'src/components/organisms/taskBoard/TaskBoard';
import { Status, Task } from 'src/api/response/typings';
import Flyout from 'src/components/molecules/flyout/Flyout';
import TaskForm from 'src/components/molecules/taskForm/TaskForm';
import { CreateTaskInput } from 'src/api/request/typings';

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

const ADD_TASK = gql`
  mutation AddTask($input: CreateTaskInput!) {
    createTask(input: $input) {
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
  const [assigneeId, setAssigneeId] = useState<string>('');
  const [loadingTasks, setLoadingTasks] = useState<boolean>(false);
  const [errorTasks, setErrorTasks] = useState<string | null>(null);
  const [tasks, setTasks] = useState<{ [key: string]: Task[] } | null>(null);
  const [isFlyoutOpen, setIsFlyoutOpen] = useState<boolean>(false);
  const [getTasks, { refetch }] = useLazyQuery(GET_TASKS_BY_USER);
  const [createTask] = useMutation(ADD_TASK);

  const onCloseFlyout = () => {
    setIsFlyoutOpen(false);
  };

  const { loading: loadingProfile, error: errorProfile } = useQuery(
    GET_PROFILE,
    {
      onCompleted: async (queryData) => {
        setLoadingTasks(true);
        setErrorTasks(null);
        setAssigneeId(queryData.profile.id);
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

  const onSubmit = async (input: CreateTaskInput) => {
    input.assigneeId = assigneeId;
    await createTask({
      variables: { input },
      update: (cache, { data }) => {
        const newTask = data?.createTask;
        cache.modify({
          fields: {
            tasks(existingTasks = []) {
              return [...existingTasks, newTask];
            },
          },
        });
      },
      onCompleted: () => {
        refetch();
      },
    });
    onCloseFlyout();
  };

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
        <IconButton
          variant="filled"
          onClick={() => {
            setIsFlyoutOpen(true);
          }}
        >
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
      <Flyout isOpen={isFlyoutOpen} onClose={onCloseFlyout}>
        <TaskForm onSubmit={onSubmit} onClose={onCloseFlyout} />
      </Flyout>
    </div>
  );
}

export default Dashboard;
