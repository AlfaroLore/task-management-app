import { DueDateProps } from './typings';
import { ClockIcon } from '@heroicons/react/24/outline';
import cx from 'classnames';
import {
  formattedDate,
  isLessThanTwoDays,
  isOverdue,
  isToday,
  isTomorrow,
  isYesterday,
} from 'src/utils/dateUtils';

const DueDate: React.FC<DueDateProps> = ({ dueDate }) => {
  const date = new Date(dueDate);
  let displayText = '';
  const overdue = isOverdue(date);
  const lessThanTwoDays = isLessThanTwoDays(date);

  if (isTomorrow(date)) {
    displayText = 'Tomorrow';
  } else if (isToday(date)) {
    displayText = 'Today';
  } else if (isYesterday(date)) {
    displayText = 'Yesterday';
  } else {
    displayText = formattedDate(date);
  }

  return (
    <span
      className={cx(
        'inline-flex items-center rounded-md px-2 py-1 text-sm gap-1 font-bold',
        {
          'bg-primary2/20 text-primary4': overdue,
        },
        {
          'bg-neutral2/20 text-white': !overdue && !lessThanTwoDays,
        },
        {
          'bg-tertiary1 text-white': !overdue && lessThanTwoDays,
        }
      )}
    >
      <ClockIcon
        className={cx(
          'h-4 w-4',
          { 'text-primary4': overdue },
          { 'text-neutral1': !overdue && !lessThanTwoDays },
          { 'text-tertiary1': !overdue && lessThanTwoDays }
        )}
      />
      {displayText}
    </span>
  );
};

export default DueDate;
