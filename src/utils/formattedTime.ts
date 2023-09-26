import { MONTHS } from './constants';

export const formattedTimestamp = (timestamp: string | number): string => {
  const d = new Date(timestamp);
  const date = `${MONTHS[d.getMonth()]}-${d.getDate()}-${d.getFullYear()}`;
  const time = d.toTimeString().split(' ')[0];
  return `${time} ${date}`;
};
