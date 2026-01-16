import { useQuery } from '@tanstack/react-query';
import { getExchangeRates } from 'src/api/exchangeRate';
import { exchangeRateKeys } from 'src/queries/exchangeRate/key';

// 1분마다 최신 환율 정보 조회
export const useExchangeRatesQuery = () => {
  return useQuery({
    queryKey: exchangeRateKeys.latest(),
    queryFn: getExchangeRates,
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
  });
};
