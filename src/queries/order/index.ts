import { useMutation, useQuery } from '@tanstack/react-query';
import { createExchange, type ExchangeRequest, getOrders, getQuote, type QuoteRequest } from 'src/api/order';
import { orderKeys } from 'src/queries/order/key';

// 환전 견적 조회
export const useQuoteQuery = (params: QuoteRequest, enabled: boolean = false) => {
  return useQuery({
    queryKey: orderKeys.quote(params),
    queryFn: () => getQuote(params),
    enabled,
  });
};

// 환전 주문 실행
export const useExchangeMutation = () => {
  return useMutation({
    mutationFn: (data: ExchangeRequest) => createExchange(data),
  });
};

// 환전 내역 목록 조회
export const useOrdersQuery = () => {
  return useQuery({
    queryKey: orderKeys.list(),
    queryFn: getOrders,
  });
};
