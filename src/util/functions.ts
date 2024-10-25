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
  return `${Math.floor(minutes / 60)}h ${
    minutes % 60 ? (minutes % 60) + 'm' : ''
  }`;
};

export const handleMinutes = () => {
  const listHour = (hour = '00:00') => {
    return hour.split(':').map((i) => parseInt(i));
  };
  const calcListHour = (list: number[]) => {
    return list[0] * 60 + list[1];
  };
  const totalMinutes = (hour = '00:00') => {
    return calcListHour(listHour(hour));
  };
  return {
    calcListHour,
    listHour,
    totalMinutes,
  };
};

export const calcIntervalMinutes = (line: ScoreLineItem) => {
  let minutes = 0;

  const { calcListHour, listHour } = handleMinutes();
  const start = listHour(line.start);
  const end = listHour(line.end);

  if (start[0] === end[0]) {
    if (end[1] < start[1]) minutes += (end[0] + 24) * 60 + end[1] - start[1];

    if (end[1] > start[1]) minutes += end[1] - start[1];

    return minutes;
  }

  if (end[0] < start[0]) end[0] += 24;

  minutes += calcListHour(end) - calcListHour(start);

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

    minutes += calcIntervalMinutes(line);
  });

  return minutes;
};
