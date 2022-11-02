import React, { useEffect, useState } from 'react';
import ScoreLine from './ScoreLine';

import { addZero, scoreLineBuilder } from '../util/functions';
import { ScoreLineItem } from '../util/types';

function ScoreCard() {
  const [scoreLines, setScoreLines] = useState<ScoreLineItem[]>([]);

  const [totalHours, setTotalHours] = useState('');

  const addScoreLine = (postion: number) => {
    const list = [...scoreLines];
    list.splice(postion, 0, scoreLineBuilder());
    setScoreLines(list);
  };

  const deleteScoreLine = (id: string) => {
    setScoreLines(scoreLines.filter((i) => i.id !== id));
  };

  const updateValues = (type: string, id: string, value: string) => {
    setScoreLines(() => {
      const index = scoreLines.findIndex((line) => line.id === id);
      if (index !== -1)
        if (type === 'start' || type === 'end') scoreLines[index][type] = value;

      calculateHours(scoreLines);

      return scoreLines;
    });
  };

  const calculateHours = (list: ScoreLineItem[]) => {
    let minutes = 0;

    list.forEach((line) => {
      if (!line.start || !line.end) return;

      const start = line.start.split(':').map((i) => parseInt(i));
      const end = line.end.split(':').map((i) => parseInt(i));

      if (line.start === line.end) {
        minutes += 0;
        return;
      }

      if (start[0] === end[0]) {
        if (end[1] < start[1])
          minutes += (end[0] + 24) * 60 + end[1] - start[1];

        if (end[1] > start[1]) minutes += end[1] - start[1];

        return;
      }

      if (end[0] < start[0]) end[0] += 24;

      const startMinutes = start[0] * 60 + start[1];
      const endMinutes = end[0] * 60 + end[1];
      minutes += endMinutes - startMinutes;
    });

    let total = `${addZero(Math.floor(minutes / 60), 2)}:${addZero(
      minutes % 60,
      2,
    )}`;

    setTotalHours(total);
  };

  useEffect(() => {
    calculateHours(scoreLines);
  }, [scoreLines]);

  if (scoreLines.length <= 0) addScoreLine(0);

  return (
    <>
      <div className="card flex-col max-w-lg w-full m-3">
        <h2 className="title">Calculadora de Folha de Pontos</h2>

        <div className="mt-5">
          <div className="grid grid-cols-12 gap-2">
            <div className="grid col-span-8 grid-cols-2 gap-2">
              <p>Hora inicial</p>
              <p>Hora final</p>
            </div>
          </div>
          {scoreLines.map((line, index) => (
            <ScoreLine
              key={line.id}
              lineIndex={index}
              line={line}
              addScoreLine={() => addScoreLine(index + 1)}
              deleteScoreLine={() => deleteScoreLine(line.id)}
              updateValues={updateValues}
              firstLine={index === 0}
            />
          ))}
        </div>
      </div>

      {totalHours && totalHours !== '00:00' && (
        <div className="mt-5">
          <h2 className="text-3xl font-bold">Total de Horas: {totalHours}</h2>
        </div>
      )}
    </>
  );
}

export default ScoreCard;
