import { api } from 'src/api';

export interface QuoteRequest {
  fromCurrency: string;
  toCurrency: string;
  forexAmount: number;
}

export interface QuoteResponse {
  krwAmount: number;
  appliedRate: number;
}

export interface ExchangeRequest {
  exchangeRateId: number;
  fromCurrency: string;
  toCurrency: string;
  forexAmount: number;
}

export const getQuote = async (params: QuoteRequest): Promise<QuoteResponse> => {
  return api.get<QuoteResponse>('/orders/quote', { params });
};

export const createExchange = async (data: ExchangeRequest): Promise<string> => {
  return api.post<string>('/orders', data);
};
