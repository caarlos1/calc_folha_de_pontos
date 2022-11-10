import React, { useEffect, useState } from 'react';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

import { ScoreLineItem } from '../util/types';

const ScoreLine = ({
  addScoreLine,
  deleteScoreLine,
  line,
  firstLine = false,
  lineIndex,
  updateValues,
}: {
  addScoreLine: () => void;
  deleteScoreLine: () => void;
  line: ScoreLineItem;
  lineIndex: number;
  firstLine?: boolean;
  updateValues: (type: string, id: string, value: string) => void;
}) => {
  const [inputStart, setInputStart] = useState('');
  const [inputEnd, setInputEnd] = useState('');

  useEffect(() => {
    setInputStart(line.start);
    setInputEnd(line.end);
  }, [line.start, line.end]);

  return (
    <div className="container my-2">
      <div className="grid grid-cols-12 gap-2">
        <div className="grid col-span-8 grid-cols-2 gap-2">
          <input
            type="time"
            className="text-field col-span-1"
            title={`Ponto Inicial: ${lineIndex + 1}`}
            value={inputStart}
            onChange={(event) => {
              setInputStart(event.target.value);
              updateValues('start', line.id, event.target.value);
            }}
          />
          <input
            type="time"
            className="text-field col-span-1"
            title={`Ponto Final: ${lineIndex + 1}`}
            value={inputEnd}
            onChange={(event) => {
              setInputEnd(event.target.value);
              updateValues('end', line.id, event.target.value);
            }}
          />
        </div>

        <div className="col-span-4 flex gap-2">
          <button
            onClick={() => addScoreLine()}
            className="add-button w-full"
            title={`Adicionar Linha ${lineIndex + 2}`}
          >
            <PlusCircleIcon className="h-6 w-6" />
          </button>

          {!firstLine && (
            <button
              onClick={() => deleteScoreLine()}
              className="remove-button w-full"
              title={`Remover Linha ${lineIndex + 1}`}
            >
              <TrashIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreLine;
