import { useQuery } from '@tanstack/react-query';
import { getWallets } from 'src/api/wallet';
import { walletKeys } from 'src/queries/wallet/key';

export const useWalletsQuery = () => {
  return useQuery({
    queryKey: walletKeys.list(),
    queryFn: getWallets,
  });
};
