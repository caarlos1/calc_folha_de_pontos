import {
  calcIntervalMinutes,
  formatMinutesToHourString,
} from '../util/functions';
import { ScoreLineItem } from '../util/types';
import { handleMinutes } from '../util/functions';

const { totalMinutes } = handleMinutes();

const ScoreTable = ({
  scoreLines,
  totalHours,
  extraHour,
}: {
  scoreLines: ScoreLineItem[];
  totalHours: string;
  extraHour: string;
}) => {
  return (
    <div className="max-w-lg w-full border border-slate-200 dark:border-slate-900 pt-4 rounded-md mt-4 shadow-lg">
      <table className="table-auto w-full" title="Tabela de Horas Totais">
        <thead>
          <tr>
            <th className="th-table">Início</th>
            <th className="th-table">Fim</th>
            <th className="th-table">Total</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900">
          {scoreLines
            .filter((l) => calcIntervalMinutes(l))
            .map((line, index) => (
              <tr key={index}>
                <td className="td-table" title={`Início do Ponto ${index + 1}`}>
                  {line.start}
                </td>
                <td className="td-table" title={`Fim do Ponto ${index + 1}`}>
                  {line.end}
                </td>
                <td className="td-table" title={`Total de Horas ${index + 1}`}>
                  {formatMinutesToHourString(calcIntervalMinutes(line))}
                </td>
              </tr>
            ))}
          {!!totalMinutes(extraHour) && (
            <tr className="bg-green-100">
              <td className="td-table" title={`Hora Extra`}>
                Hora Extra:
              </td>
              <td></td>
              <td className="td-table" title={`Hora Extra`}>
                {extraHour}
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <th className="th-f-table">Horas Totais:</th>
            <th className="th-f-table"></th>
            <td className="th-f-result-table" title="Total de Horas Calculadas">
              {totalHours}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ScoreTable;
