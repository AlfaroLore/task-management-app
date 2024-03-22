import {
  ListBulletIcon,
  PlusIcon,
  TableCellsIcon,
} from '@heroicons/react/16/solid';
import { useState } from 'react';
import IconButton from 'src/components/atoms/iconButton/IconButton';
import cx from 'classnames';

function Dashboard() {
  const [isGridView, setIsGridView] = useState<boolean>(false);

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
      <div className="grid grid-cols-5 p-2 text-white">
        <div>
          <p className="font-encodeSans">Backlog</p>
        </div>
        <div>
          <p>Todo</p>
        </div>
        <div>
          <p>In Progress</p>
        </div>
        <div>
          <p>Done</p>
        </div>
        <div>
          <p>Cancelled</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
