import { format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

declare type DateType = string | number | Date;

export const fDate = (date: DateType): string => format(new Date(date), 'dd MMMM yyyy');

export const fDateTime = (date: DateType): string => format(new Date(date), 'dd MMM yyyy HH:mm');

export const fDateTimeSuffix = (date: DateType): string => format(new Date(date), 'dd/MM/yyyy hh:mm p');

export const fToNow = (date: DateType): string => formatDistanceToNow(new Date(date), {
  addSuffix: true,
});
