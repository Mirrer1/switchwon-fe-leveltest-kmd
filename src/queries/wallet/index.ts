import { useQuery } from '@tanstack/react-query';
import { getWallets } from 'src/api/wallet';
import { walletKeys } from 'src/queries/wallet/key';

// 지갑 잔액 및 총 자산 조회
export const useWalletsQuery = () => {
  return useQuery({
    queryKey: walletKeys.list(),
    queryFn: getWallets,
  });
};
