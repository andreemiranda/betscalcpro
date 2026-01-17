
import React from 'react';
import { ProgressionRow } from '../types';
import { formatCurrency, formatPercent } from '../utils/formatters';

interface ProgressionTableProps {
  data: ProgressionRow[];
}

const ProgressionTable: React.FC<ProgressionTableProps> = ({ data }) => {
  // Ajuste fino de fontes para caber em telas mobile pequenas
  const headerClass = "py-3 px-1 text-[clamp(9px,2.2vw,13px)] font-black text-gray-400 border-b-2 border-gray-100 uppercase tracking-tighter whitespace-nowrap";
  
  // Classe base da célula com lógica de hover: verde vira fundo verde com texto amarelo
  const cellBase = "py-3 px-1 text-[clamp(10px,2.5vw,14px)] font-bold tabular-nums whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-200 cursor-default hover:bg-primary";

  return (
    <div className="w-full bg-neutralBg rounded-2xl border border-gray-100 overflow-hidden">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-gray-50/50">
            <th className={`${headerClass} text-left w-[12%]`}>ID</th>
            <th className={`${headerClass} text-right w-[18%]`}>ODD</th>
            <th className={`${headerClass} text-right w-[35%]`}>SALDO</th>
            <th className={`${headerClass} text-right w-[35%]`}>LUCRO</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            const isLast = index === data.length - 1;
            return (
              <tr 
                key={index} 
                className={`
                  border-b border-gray-50 last:border-0 bg-white
                  ${isLast ? 'bg-yellow-50/50' : ''}
                `}
              >
                <td className={`${cellBase} text-left text-gray-300 hover:text-accent`}>
                  {row.game}
                </td>
                <td className={`${cellBase} text-right text-gray-600 hover:text-accent`}>
                  {formatPercent(row.odd)}
                </td>
                <td className={`${cellBase} text-right text-primary hover:text-accent font-black`}>
                  {formatCurrency(row.balance)}
                </td>
                <td className={`${cellBase} text-right text-success hover:text-accent`}>
                  {formatCurrency(row.returns)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProgressionTable;
