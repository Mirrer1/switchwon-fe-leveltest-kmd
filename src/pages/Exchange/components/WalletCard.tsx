import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useWalletsQuery } from 'src/queries/wallet';

const WalletCard = () => {
  const { data, isLoading } = useWalletsQuery();

  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      KRW: '₩',
      USD: '$',
      JPY: '¥',
    };
    return symbols[currency] || currency;
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-gray-300 bg-gray-100 p-12 shadow-sm">
        <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col rounded-lg border border-gray-300 bg-gray-100 p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900">내 지갑</h2>

      <div className="flex-1 space-y-4">
        {data?.wallets.map(wallet => (
          <div key={wallet.walletId} className="flex items-center justify-between">
            <span className="text-base text-gray-700">{wallet.currency}</span>
            <span className="text-base font-medium text-gray-900">
              {getCurrencySymbol(wallet.currency)} {wallet.balance.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between">
          <span className="text-base text-gray-700">총 보유 자산</span>
          <span className="text-xl font-bold text-blue-500">₩ {data?.totalKrwBalance.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
