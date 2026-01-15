export const exchangeRateKeys = {
  all: ['exchangeRate'] as const,
  latest: () => [...exchangeRateKeys.all, 'latest'] as const,
};
