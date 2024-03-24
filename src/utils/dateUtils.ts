const getTodayUTC = () => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today;
};
export const formattedDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  };
  return date.toLocaleDateString('en-US', options);
};

export const isOverdue = (date: Date) => {
  const today = getTodayUTC();
  return date < today;
};

export const isLessThanTwoDays = (date: Date) => {
  const today = getTodayUTC();
  const twoDaysFromNow = new Date(today);
  twoDaysFromNow.setUTCDate(twoDaysFromNow.getUTCDate() + 2);
  return date.getTime() <= twoDaysFromNow.getTime();
};

export const isTomorrow = (date: Date) => {
  const today = getTodayUTC();
  const tomorrow = new Date(today);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  return date.getTime() === tomorrow.getTime();
};

export const isToday = (date: Date) => {
  const today = getTodayUTC();
  return date.getTime() === today.getTime();
};

export const isYesterday = (date: Date) => {
  const today = getTodayUTC();
  const yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  return date.getTime() === yesterday.getTime();
};
