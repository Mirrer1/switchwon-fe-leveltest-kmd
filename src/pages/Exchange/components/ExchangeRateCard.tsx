import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';

export interface ExchangeRate {
  currency: string;
  name: string;
  rate: number;
  change: number;
}

interface ExchangeRateCardProps {
  rate: ExchangeRate;
}

const ExchangeRateCard = ({ rate }: ExchangeRateCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">{rate.currency}</span>
        <span className="text-sm text-gray-500">{rate.name}</span>
      </div>
      <div className="mb-2 text-2xl font-bold text-gray-900">{rate.rate.toLocaleString()} KRW</div>
      <div
        className={`flex items-center gap-1 text-sm font-medium ${rate.change > 0 ? 'text-red-500' : 'text-blue-500'}`}
      >
        {rate.change > 0 ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
        <span>
          {rate.change > 0 ? '+' : ''}
          {rate.change}%
        </span>
      </div>
    </div>
  );
};

export default ExchangeRateCard;
