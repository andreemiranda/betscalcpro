
import { ProgressionRow, CalcResults } from '../types';

export const calculateProgression = (
  initialInvestment: number,
  oddPercent: number,
  games: number
): CalcResults => {
  const i = oddPercent / 100;
  const progression: ProgressionRow[] = [];
  let currentBalance = initialInvestment;
  let accumulatedReturns = 0;

  for (let x = 1; x <= games; x++) {
    const profit = currentBalance * i;
    currentBalance += profit;
    accumulatedReturns += profit;

    progression.push({
      game: x,
      odd: oddPercent,
      balance: currentBalance,
      returns: accumulatedReturns,
    });
  }

  const rentability = initialInvestment > 0 
    ? ((currentBalance / initialInvestment) - 1) * 100 
    : 0;

  return {
    finalValue: currentBalance,
    totalReturns: accumulatedReturns,
    rentability,
    progression,
  };
};
