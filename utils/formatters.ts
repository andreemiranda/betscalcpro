
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const formatPercent = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

export const parseBRL = (value: string): number => {
  const cleanValue = value.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(cleanValue) || 0;
};

export const maskCurrency = (value: string): string => {
  let v = value.replace(/\D/g, '');
  v = (Number(v) / 100).toFixed(2).toString();
  v = v.replace('.', ',');
  v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  return `R$ ${v}`;
};
