import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { useExchangeRatesQuery } from 'src/queries/exchangeRate';

const ExchangeRateCard = () => {
  const { data: exchangeRates, isLoading } = useExchangeRatesQuery();

  const getCurrencyName = (currency: string) => {
    const names: Record<string, string> = {
      USD: '미국 달러',
      JPY: '일본 엔화',
    };
    return names[currency] || currency;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center col-span-2 p-12 bg-white border border-gray-200 rounded-lg shadow-sm">
        <AiOutlineLoading3Quarters className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  const CURRENCY_ORDER = ['USD', 'JPY'];
  const sortedRates = [...(exchangeRates || [])].sort(
    (a, b) => CURRENCY_ORDER.indexOf(a.currency) - CURRENCY_ORDER.indexOf(b.currency),
  );

  return (
    <>
      {sortedRates?.map(rate => (
        <div key={rate.currency} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-gray-900">{rate.currency}</span>
            <span className="text-sm text-gray-500">{getCurrencyName(rate.currency)}</span>
          </div>
          <div className="mb-2 text-2xl font-bold text-gray-900">{rate.rate.toLocaleString()} KRW</div>
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              rate.changePercentage > 0 ? 'text-red-500' : 'text-blue-500'
            }`}
          >
            {rate.changePercentage > 0 ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
            <span>
              {rate.changePercentage > 0 ? '+' : ''}
              {rate.changePercentage}%
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default ExchangeRateCard;
