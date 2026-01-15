import { api } from 'src/api';

export interface ExchangeRate {
  exchangeRateId: number;
  currency: string;
  rate: number;
  changePercentage: number;
  applyDateTime: string;
}

export const getExchangeRates = async (): Promise<ExchangeRate[]> => {
  return api.get<ExchangeRate[]>('/exchange-rates/latest');
};
