export const orderKeys = {
  all: ['order'] as const,
  list: () => [...orderKeys.all, 'list'] as const,
  quote: (params: { fromCurrency: string; toCurrency: string; forexAmount: number }) =>
    [...orderKeys.all, 'quote', params] as const,
};
