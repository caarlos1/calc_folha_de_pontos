import React, { useEffect, useState } from 'react';

import {
  calcMinutes,
  calcTotalMinutes,
  formatMinutesToHourString,
  scoreLineBuilder,
} from '../util/functions';
import { ScoreLineItem } from '../util/types';
import ScoreTable from '../components/ScoreTable';
import ScoreCard from '../components/ScoreCard';

const ScorePage = () => {
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

  const updateTotalHours = (scoreLines: ScoreLineItem[]) =>
    setTotalHours(formatMinutesToHourString(calcTotalMinutes(scoreLines)));

  const updateValues = (type: string, id: string, value: string) => {
    setScoreLines(() => {
      const index = scoreLines.findIndex((line) => line.id === id);
      if (index !== -1)
        if (type === 'start' || type === 'end') scoreLines[index][type] = value;

      updateTotalHours(scoreLines);

      return scoreLines;
    });
  };

  useEffect(() => {
    updateTotalHours(scoreLines);
  }, [scoreLines]);

  if (scoreLines.length <= 0) addScoreLine(0);

  return (
    <>
      <ScoreCard
        scoreLines={scoreLines}
        addScoreLine={addScoreLine}
        deleteScoreLine={deleteScoreLine}
        updateValues={updateValues}
      />

      {scoreLines.filter((l) => calcMinutes(l)).length > 0 && (
        <ScoreTable scoreLines={scoreLines} totalHours={totalHours} />
      )}
    </>
  );
};

export default ScorePage;
