import {
  ListBulletIcon,
  PlusIcon,
  TableCellsIcon,
} from '@heroicons/react/16/solid';
import { useState } from 'react';
import IconButton from 'src/components/atoms/iconButton/IconButton';
import cx from 'classnames';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import TaskBoard from 'src/components/organisms/taskBoard/TaskBoard';
import { Status, Task } from 'src/api/response/typings';
import Flyout from 'src/components/molecules/flyout/Flyout';
import TaskForm from 'src/components/molecules/taskForm/TaskForm';
import { CreateTaskInput } from 'src/api/request/typings';
import { ADD_TASK, GET_PROFILE, GET_TASKS_BY_USER } from 'src/api/gql';
import { PROFILE_ID } from 'src/utils/constants';

function Dashboard() {
  const [isGridView, setIsGridView] = useState<boolean>(false);
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
        try {
          const statuses = Object.values(Status).filter(
            (value) => typeof value === 'string'
          );
          localStorage.setItem(PROFILE_ID, queryData.profile.id);

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
    await createTask({
      variables: { input },
      update: (cache, { data }) => {
        const newTask = data?.createTask;
        cache.modify({
          fields: {
            tasks(existingTasks = [], { toReference }) {
              return [...existingTasks, toReference(newTask)];
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

  const openFlyout = async () => {
    setIsFlyoutOpen(true);
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
        <IconButton variant="filled" onClick={openFlyout}>
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
