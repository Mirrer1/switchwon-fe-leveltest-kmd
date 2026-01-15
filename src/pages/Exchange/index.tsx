import ExchangeRateCard from 'src/pages/Exchange/components/ExchangeRateCard';
import WalletCard from 'src/pages/Exchange/components/WalletCard';

const Exchange = () => {
  // TODO: API 연동
  const exchangeRates = [
    { currency: 'USD', name: '미국 달러', rate: 1320.5, change: 0.5 },
    { currency: 'JPY', name: '일본 엔화', rate: 9.85, change: -1.1 },
  ];

  // TODO: API 연동
  const wallets = [
    { currency: 'KRW', symbol: '₩', amount: 1200000 },
    { currency: 'USD', symbol: '$', amount: 50000 },
    { currency: 'JPY', symbol: '¥', amount: 150000 },
  ];

  const totalAssets = 3000000;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 shrink-0">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">환율 정보</h1>
        <p className="text-base text-gray-600">실시간 환율을 확인하고 간편하게 환전하세요.</p>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="grid shrink-0 grid-cols-1 gap-4 sm:grid-cols-2">
            {exchangeRates.map(rate => (
              <ExchangeRateCard key={rate.currency} rate={rate} />
            ))}
          </div>

          <WalletCard wallets={wallets} totalAssets={totalAssets} />
        </div>

        {/* TODO: 환전하기 폼 */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-gray-600">환전하기 폼 영역</p>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
