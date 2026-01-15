import { useQuery } from '@tanstack/react-query';
import { getExchangeRates } from 'src/api/exchangeRate';
import { exchangeRateKeys } from 'src/queries/exchangeRate/key';

export const useExchangeRatesQuery = () => {
  return useQuery({
    queryKey: exchangeRateKeys.latest(),
    queryFn: getExchangeRates,
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
  });
};
