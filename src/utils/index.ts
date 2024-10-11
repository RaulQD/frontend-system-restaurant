export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(value);
}

export const transformId = (id: string) => {
  if (id.length <= 6) return id;
  return `${id.slice(0, 3)}...${id.slice(-3)}`;
};