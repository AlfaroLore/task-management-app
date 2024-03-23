import { DueDateProps } from './typings';
import { BellIcon } from '@heroicons/react/24/outline';
import cx from 'classnames';

const DueDate: React.FC<DueDateProps> = ({ dueDate }) => {
  const date = new Date(dueDate);

  const formattedDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const isOverdue = () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    return date < today;
  };

  const isLessThanTwoDays = () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const twoDaysFromNow = new Date(today);
    twoDaysFromNow.setUTCDate(twoDaysFromNow.getUTCDate() + 2);
    return date.getTime() <= twoDaysFromNow.getTime();
  };

  const isTomorrow = () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    return date.getTime() === tomorrow.getTime();
  };

  const isToday = () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    return date.getTime() === today.getTime();
  };

  const isYesterday = () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    return date.getTime() === yesterday.getTime();
  };

  let displayText = '';

  if (isTomorrow()) {
    displayText = 'Tomorrow';
  } else if (isToday()) {
    displayText = 'Today';
  } else if (isYesterday()) {
    displayText = 'Yesterday';
  } else {
    displayText = formattedDate();
  }

  return (
    <span
      className={cx(
        'inline-flex items-center rounded-md px-2 py-1 text-sm gap-1 font-bold',
        {
          'bg-primary2/20 text-primary4': isOverdue(),
        },
        {
          'bg-neutral2/20 text-white': !isOverdue() && !isLessThanTwoDays(),
        },
        {
          'bg-tertiary1 text-white': !isOverdue() && isLessThanTwoDays(),
        }
      )}
    >
      <BellIcon
        className={cx(
          'h-4 w-4',
          { 'text-primary4': isOverdue() },
          { 'text-neutral1': !isOverdue() && !isLessThanTwoDays() },
          { 'text-tertiary1': !isOverdue() && isLessThanTwoDays() }
        )}
      />
      {displayText}
    </span>
  );
};

export default DueDate;
