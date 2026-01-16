import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useOrdersQuery } from 'src/queries/order';

const History = () => {
  const { data: orders, isLoading } = useOrdersQuery();

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <AiOutlineLoading3Quarters className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6 shrink-0">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">환전 내역</h1>
        <p className="text-base text-gray-600">환전 내역을 확인하실 수 있어요.</p>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="h-4 border border-b-0 border-gray-200 rounded-t-lg" />
        <div className="bg-white border border-gray-200 rounded-b-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-10 py-3 text-sm font-medium text-left text-gray-400">거래 ID</th>
                <th className="px-10 py-3 text-sm font-medium text-left text-gray-400">거래 일시</th>
                <th className="px-10 py-3 text-sm font-medium text-left text-gray-400">출금</th>
                <th className="px-10 py-3 text-sm font-medium text-left text-gray-400">입금</th>
                <th className="px-10 py-3 text-sm font-medium text-left text-gray-400">체결 환율</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map(order => (
                <tr key={order.orderId} className="transition-colors border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-10 py-3 text-sm text-gray-700">{order.orderId}</td>
                  <td className="px-10 py-3 text-sm text-gray-700">{formatDate(order.orderedAt)}</td>
                  <td className="px-10 py-3 text-sm text-gray-700">
                    {order.fromAmount.toLocaleString('ko-KR')} {order.fromCurrency}
                  </td>
                  <td className="px-10 py-3 text-sm text-gray-700">
                    {order.toAmount.toLocaleString('ko-KR')} {order.toCurrency}
                  </td>
                  <td className="px-10 py-3 text-sm text-gray-700">{order.appliedRate.toLocaleString('ko-KR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
