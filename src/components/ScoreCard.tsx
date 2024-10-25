import { useEffect, useState } from 'react';
import { ScoreLineItem } from '../util/types';
import ScoreLine from './ScoreLine';

const ScoreCard = ({
  scoreLines,
  addScoreLine,
  deleteScoreLine,
  updateValues,
  updateExtraHour,
  extraHour,
}: {
  scoreLines: ScoreLineItem[];
  addScoreLine: (postion: number) => void;
  deleteScoreLine: (id: string) => void;
  updateValues: (type: string, id: string, value: string) => void;
  updateExtraHour: (hour: string) => void;
  extraHour: string;
}) => {
  const [inputExtraHour, setInputExtraHour] = useState('');

  useEffect(() => {
    setInputExtraHour(extraHour);
  }, [extraHour]);

  return (
    <div
      className="card flex-col max-w-lg w-full m-3"
      title="Planejador de Batidas de Pontos"
    >
      <h2 className="title">Planejador de Batidas de Pontos</h2>
      <p className="description">
        Planejador de batidas de ponto para <b>pessoas preguiçosas</b> que esperam até
        o último dia do mês para descobrir que horas <b>precisam sair</b> (sem causar
          problemas sérios com o RH).
      </p>

      <div className="mt-5">
        <div className="grid grid-cols-12 gap-2">
          <div className="grid col-span-8 grid-cols-2 gap-2 dark:text-white">
            <p>Inicial:</p>
            <p>Final:</p>
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

        <div className="mt-5">
          <label htmlFor="extra-minutes" className="dark:text-white">
            Banco de Horas:
          </label>

          <input
            type="time"
            id="extra-minutes"
            className="text-field col-span-1 mt-2"
            value={inputExtraHour}
            onChange={(event) => {
              setInputExtraHour(event.target.value);
              updateExtraHour(event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
