import { api } from 'src/api';

export interface Wallet {
  walletId: number;
  currency: string;
  balance: number;
}

export interface WalletsResponse {
  totalKrwBalance: number;
  wallets: Wallet[];
}

export const getWallets = async (): Promise<WalletsResponse> => {
  return api.get<WalletsResponse>('/wallets');
};
