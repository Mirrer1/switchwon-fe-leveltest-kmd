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
      <div className="col-span-2 flex items-center justify-center rounded-lg border border-gray-200 bg-white p-12 shadow-sm">
        <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <>
      {exchangeRates?.map(rate => (
        <div key={rate.currency} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
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
