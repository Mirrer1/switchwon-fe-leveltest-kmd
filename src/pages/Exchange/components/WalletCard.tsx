export interface Wallet {
  currency: string;
  symbol: string;
  amount: number;
}

interface WalletCardProps {
  wallets: Wallet[];
  totalAssets: number;
}

const WalletCard = ({ wallets, totalAssets }: WalletCardProps) => {
  return (
    <div className="flex flex-1 flex-col rounded-lg border border-gray-300 bg-gray-100 p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900">내 지갑</h2>

      <div className="flex-1 space-y-4">
        {wallets.map(wallet => (
          <div key={wallet.currency} className="flex items-center justify-between">
            <span className="text-base text-gray-700">{wallet.currency}</span>
            <span className="text-base font-medium text-gray-900">
              {wallet.symbol} {wallet.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between">
          <span className="text-base text-gray-700">총 보유 자산</span>
          <span className="text-xl font-bold text-blue-500">₩ {totalAssets.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
