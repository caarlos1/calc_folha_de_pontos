import { v4 as uuidv4 } from 'uuid';
import { ScoreLineItem } from './types';

export const toClass = (classList: string[]) => classList.join(' ');

export const scoreLineBuilder = (): ScoreLineItem => ({
  id: uuidv4(),
  start: '00:00',
  end: '00:00',
});

export const addZero = (value: number, n: number) => {
  let valueString = value.toString();
  if (valueString.length < n) {
    while (valueString.length < n) {
      valueString = `0${valueString}`;
    }
  }
  return valueString;
};


export const formatMinutesToHourString = (minutes: number) => {
  return `${addZero(Math.floor(minutes / 60), 2)}:${addZero(minutes % 60, 2)}`;
};

export const calcMinutes = (line: ScoreLineItem) => {
  let minutes = 0;

  const start = line.start.split(':').map((i) => parseInt(i));
  const end = line.end.split(':').map((i) => parseInt(i));

  if (start[0] === end[0]) {
    if (end[1] < start[1]) minutes += (end[0] + 24) * 60 + end[1] - start[1];

    if (end[1] > start[1]) minutes += end[1] - start[1];

    return minutes;
  }

  if (end[0] < start[0]) end[0] += 24;

  const startMinutes = start[0] * 60 + start[1];
  const endMinutes = end[0] * 60 + end[1];
  minutes += endMinutes - startMinutes;

  return minutes;
};

export const calcTotalMinutes = (list: ScoreLineItem[]) => {
  let minutes = 0;

  list.forEach((line) => {
    if (!line.start || !line.end) return;

    if (line.start === line.end) {
      minutes += 0;
      return;
    }

    minutes += calcMinutes(line);
  });

  return minutes;
};
