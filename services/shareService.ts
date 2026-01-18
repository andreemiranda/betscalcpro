
import { CalcResults, InvestmentState } from '../types.ts';
import { formatCurrency, formatPercent } from '../utils/formatters.ts';

const getShareText = (results: CalcResults, inputs: InvestmentState) => {
  return `Confira minha progressão de banca no Bet's Calc Pro! 💰📈%0A%0AInvestimento: ${inputs.initialInvestment}%0AOdd Média: ${inputs.averageOdd}%25%0AJogos: ${inputs.numberOfGames}%0AValor Final: ${formatCurrency(results.finalValue)}%0ARentabilidade: ${formatPercent(results.rentability)}%0A%0AFaça sua simulação aqui: ${window.location.href}`;
};

export const shareToWhatsApp = (results: CalcResults, inputs: InvestmentState) => {
  const url = `https://wa.me/?text=${getShareText(results, inputs)}`;
  window.open(url, '_blank');
};

export const shareToTelegram = (results: CalcResults, inputs: InvestmentState) => {
  const url = `https://t.me/share/url?url=${window.location.href}&text=${getShareText(results, inputs).replace(window.location.href, '')}`;
  window.open(url, '_blank');
};

export const shareResult = async (results: CalcResults, inputs: InvestmentState) => {
  const text = getShareText(results, inputs).replace(/%0A/g, '\n').replace(/%25/g, '%');
  
  const shareData: any = {
    title: "Bet's Calc Pro - Gestão de Banca",
    text: text,
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err: any) {
      if (err.name !== 'AbortError') copyToClipboard(text);
    }
  } else {
    copyToClipboard(text);
  }
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert('Link e resultados copiados!');
  } catch (err) {
    console.error('Falha ao copiar:', err);
  }
};
