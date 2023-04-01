import React, { useEffect, useState } from 'react';

import {
  calcIntervalMinutes,
  handleMinutes,
  calcTotalMinutes,
  formatMinutesToHourString,
  scoreLineBuilder,
} from '../util/functions';
import * as storage from '../util/storage';
import { ScoreLineItem } from '../util/types';
import ScoreTable from '../components/ScoreTable';
import ScoreCard from '../components/ScoreCard';

const ScorePage = () => {
  const [scoreLines, setScoreLines] = useState<ScoreLineItem[]>([]);
  const [totalHours, setTotalHours] = useState('');
  const [extraHour, setExtraHour] = useState('');

  const addScoreLine = (postion: number) => {
    const list = [...scoreLines];
    list.splice(postion, 0, scoreLineBuilder());
    setScoreLines(() => {
      storage.set('list', list);
      return list;
    });
  };

  const deleteScoreLine = (id: string) => {
    setScoreLines(scoreLines.filter((i) => i.id !== id));
  };

  const updateTotalHours = (scoreLines: ScoreLineItem[], extraHour: string) => {
    const { totalMinutes } = handleMinutes();

    storage.set('list', scoreLines);
    storage.set('extraHour', extraHour);

    setTotalHours(
      formatMinutesToHourString(
        calcTotalMinutes(scoreLines) + totalMinutes(extraHour),
      ),
    );
  };

  const updateValues = (type: string, id: string, value: string) => {
    setScoreLines(() => {
      const index = scoreLines.findIndex((line) => line.id === id);
      if (index !== -1)
        if (type === 'start' || type === 'end') scoreLines[index][type] = value;

      updateTotalHours(scoreLines, extraHour);

      return scoreLines;
    });
  };

  const updateExtraHour = (hour: string) => {
    setExtraHour(() => {
      return hour;
    });
  };

  useEffect(() => {
    updateTotalHours(scoreLines, extraHour);
  }, [scoreLines, extraHour]);

  if (scoreLines.length <= 0) {
    const list = storage.get<ScoreLineItem[]>('list');
    if (list) setScoreLines(list);
    else addScoreLine(0);
  }

  if (!extraHour) {
    const storageExtraHour = storage.get<string>('extraHour');
    if (storageExtraHour) setExtraHour(storageExtraHour);
    else setExtraHour('00:00');
  }

  return (
    <>
      <ScoreCard
        scoreLines={scoreLines}
        extraHour={extraHour}
        addScoreLine={addScoreLine}
        deleteScoreLine={deleteScoreLine}
        updateValues={updateValues}
        updateExtraHour={updateExtraHour}
      />

      {scoreLines.filter((l) => calcIntervalMinutes(l)).length > 0 && (
        <ScoreTable
          scoreLines={scoreLines}
          totalHours={totalHours}
          extraHour={extraHour}
        />
      )}
    </>
  );
};

export default ScorePage;
