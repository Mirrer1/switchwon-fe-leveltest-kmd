export const orderKeys = {
  all: ['order'] as const,
  quote: (params: { fromCurrency: string; toCurrency: string; forexAmount: number }) =>
    [...orderKeys.all, 'quote', params] as const,
};
