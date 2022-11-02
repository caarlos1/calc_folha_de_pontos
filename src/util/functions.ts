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
