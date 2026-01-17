
export interface ProgressionRow {
  game: number;
  odd: number;
  balance: number;
  returns: number;
}

export interface CalcResults {
  finalValue: number;
  totalReturns: number;
  rentability: number;
  progression: ProgressionRow[];
}

export interface InvestmentState {
  initialInvestment: string;
  averageOdd: string;
  numberOfGames: string;
}
