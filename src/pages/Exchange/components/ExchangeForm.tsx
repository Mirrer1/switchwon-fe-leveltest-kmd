import { useMemo, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import type { AxiosError } from 'axios';
import { useExchangeRatesQuery } from 'src/queries/exchangeRate';
import { useExchangeMutation, useQuoteQuery } from 'src/queries/order';

interface ApiErrorResponse {
  code: string;
  message: string;
  data: unknown;
}

const ExchangeForm = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBuy, setIsBuy] = useState(true);
  const [amount, setAmount] = useState('');

  const { data: exchangeRates } = useExchangeRatesQuery();
  const exchangeMutation = useExchangeMutation();

  const currencies = [
    { code: 'USD', name: '미국 USD', flag: '/us.jpg', unit: '달러' },
    { code: 'JPY', name: '일본 JPY', flag: '/jp.jpg', unit: '엔' },
  ];

  const selectedCurrencyInfo = currencies.find(c => c.code === selectedCurrency);
  const selectedRate = exchangeRates?.find(rate => rate.currency === selectedCurrency);

  // Quote API 파라미터 생성
  const quoteParams = useMemo(() => {
    if (!amount || Number(amount) <= 0) return null;

    return isBuy
      ? { fromCurrency: 'KRW', toCurrency: selectedCurrency, forexAmount: Number(amount) }
      : { fromCurrency: selectedCurrency, toCurrency: 'KRW', forexAmount: Number(amount) };
  }, [amount, selectedCurrency, isBuy]);

  // 환전 견적 조회
  const { data: quoteData } = useQuoteQuery(
    quoteParams || { fromCurrency: 'KRW', toCurrency: 'USD', forexAmount: 0 },
    !!quoteParams,
  );

  // 필요 원화 계산
  const calculatedKrw = useMemo(() => {
    if (quoteData) return quoteData.krwAmount;
    if (!amount || !selectedRate || Number(amount) <= 0) return 0;
    return Math.floor(Number(amount) * selectedRate.rate);
  }, [amount, selectedRate, quoteData]);

  const isDisabled = !amount || Number(amount) <= 0;

  // 환전하기 버튼 이벤트
  const handleExchange = async () => {
    if (!selectedRate || !amount) return;

    try {
      const requestData = isBuy
        ? {
            exchangeRateId: selectedRate.exchangeRateId,
            fromCurrency: 'KRW',
            toCurrency: selectedCurrency,
            forexAmount: Number(amount),
          }
        : {
            exchangeRateId: selectedRate.exchangeRateId,
            fromCurrency: selectedCurrency,
            toCurrency: 'KRW',
            forexAmount: Number(amount),
          };

      await exchangeMutation.mutateAsync(requestData);
      alert('환전이 완료되었습니다.');
      setAmount('');
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const errorMessage = axiosError.response?.data?.message || '환전에 실패했습니다.';
      alert(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-10 p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center w-40 gap-2 px-4 py-2 mb-2 transition-all duration-300 border border-gray-300 rounded-md hover:border-gray-400"
        >
          <div
            className="w-5 h-5 bg-center bg-cover rounded-full"
            style={{ backgroundImage: `url(${selectedCurrencyInfo?.flag})` }}
          />
          <span className="text-xl font-bold text-gray-900">{selectedCurrency} 환전하기</span>
          <IoChevronDown
            className={`h-5 w-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute z-50 py-2 bg-white border border-gray-200 rounded-md shadow-lg w-36 top-[40px] left-[10px]">
            {currencies.map(currency => (
              <button
                key={currency.code}
                onClick={() => {
                  setSelectedCurrency(currency.code);
                  setIsDropdownOpen(false);
                }}
                className="flex items-center w-full gap-3 px-4 py-3 text-sm text-left transition-all duration-300 hover:bg-gray-100"
              >
                <div
                  className="flex-shrink-0 w-6 h-6 bg-center bg-cover rounded-full"
                  style={{ backgroundImage: `url(${currency.flag})` }}
                />
                <span className="font-medium text-gray-900">{currency.name}</span>
              </button>
            ))}
          </div>
        )}

        <div className="relative flex gap-2 p-2 bg-white border border-gray-300 rounded-lg">
          <button
            onClick={() => setIsBuy(true)}
            className={`flex-1 rounded-md py-3 font-bold transition-all duration-300 ${
              isBuy
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-transparent text-[#FFA7A7] hover:bg-red-500 hover:text-white'
            }`}
          >
            살래요
          </button>
          <button
            onClick={() => setIsBuy(false)}
            className={`flex-1 rounded-md py-3 font-bold transition-all duration-300 ${
              !isBuy
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-transparent text-[#9DB6FF] hover:bg-blue-500 hover:text-white'
            }`}
          >
            팔래요
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-4">
        <div>
          <label htmlFor="exchange-amount" className="block mb-2 text-gray-600">
            {isBuy ? '매수 금액' : '매도 금액'}
          </label>
          <div className="relative">
            <input
              id="exchange-amount"
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="30"
              className="w-full p-4 pr-20 font-semibold text-right text-gray-500 transition-all duration-300 ease-in-out bg-white border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <span className="absolute font-semibold text-gray-400 -translate-y-1/2 right-3 top-1/2">
              {isBuy ? `${selectedCurrencyInfo?.unit} 사기` : `${selectedCurrencyInfo?.unit} 팔기`}
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full">
            <IoChevronDown className="w-6 h-6 text-white" />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-gray-600">필요 원화</label>
          <div className="p-4 text-right bg-gray-200 border border-gray-300 rounded-md">
            <span className="font-semibold text-gray-500">{calculatedKrw.toLocaleString()}</span>
            <span className={`font-semibold ${isBuy ? 'text-red-500' : 'text-blue-500'}`}>
              {isBuy ? ' 원 필요해요' : ' 원 받을 수 있어요'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <span className="text-gray-600">적용 환율</span>
          <span className="font-medium text-gray-600">
            1 {selectedCurrency} = {selectedRate?.rate.toLocaleString() || '-'} 원
          </span>
        </div>
        <button
          onClick={handleExchange}
          disabled={isDisabled}
          className={`w-full rounded-md py-5 text-base font-medium text-white transition-all duration-300 ease-in-out ${
            isDisabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-900 hover:bg-gray-700 hover:shadow-lg active:scale-[0.98]'
          }`}
        >
          환전하기
        </button>
      </div>
    </div>
  );
};

export default ExchangeForm;
