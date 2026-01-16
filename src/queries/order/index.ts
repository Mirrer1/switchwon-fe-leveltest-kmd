import { useMutation, useQuery } from '@tanstack/react-query';
import { createExchange, type ExchangeRequest, getQuote, type QuoteRequest } from 'src/api/order';
import { orderKeys } from 'src/queries/order/key';

export const useQuoteQuery = (params: QuoteRequest, enabled: boolean = false) => {
  return useQuery({
    queryKey: orderKeys.quote(params),
    queryFn: () => getQuote(params),
    enabled,
  });
};

export const useExchangeMutation = () => {
  return useMutation({
    mutationFn: (data: ExchangeRequest) => createExchange(data),
  });
};
