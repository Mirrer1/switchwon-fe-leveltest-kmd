const History = () => {
  const dummyOrders = [
    {
      orderId: 1,
      orderDate: '2025-10-05 00:00:00',
      buyAmount: 325.5,
      settledKRW: 1383.07,
      sellAmount: 454734,
    },
    {
      orderId: 2,
      orderDate: '2025-10-05 00:00:00',
      buyAmount: 41698,
      settledKRW: 1383.07,
      sellAmount: 30.0,
    },
    {
      orderId: 3,
      orderDate: '2025-10-05 00:00:00',
      buyAmount: 41698,
      settledKRW: 942.56,
      sellAmount: 30.0,
    },
    {
      orderId: 4,
      orderDate: '2025-10-05 00:00:00',
      buyAmount: 325.5,
      settledKRW: 942.56,
      sellAmount: 454734,
    },
    {
      orderId: 5,
      orderDate: '2025-10-05 00:00:00',
      buyAmount: 325.5,
      settledKRW: 942.56,
      sellAmount: 454734,
    },
    {
      orderId: 6,
      orderDate: '2025-10-05 00:00:00',
      buyAmount: 325.5,
      settledKRW: 1383.07,
      sellAmount: 454734,
    },
    {
      orderId: 7,
      orderDate: '2025-10-05 00:00:00',
      buyAmount: 325.5,
      settledKRW: 1609.7,
      sellAmount: 454734,
    },
    {
      orderId: 8,
      orderDate: '2025-10-05 00:00:00',
      buyAmount: 325.5,
      settledKRW: 1609.7,
      sellAmount: 454734,
    },
    {
      orderId: 9,
      orderDate: '2025-10-05 00:00:00',
      buyAmount: 500,
      settledKRW: 1383.07,
      sellAmount: 699690,
    },
    {
      orderId: 10,
      orderDate: '2025-10-05 00:00:00',
      buyAmount: 32.5,
      settledKRW: 1383.07,
      sellAmount: 51976,
    },
  ];

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
                <th className="px-10 py-3 text-sm font-medium text-left text-gray-400">매수 금액</th>
                <th className="px-10 py-3 text-sm font-medium text-left text-gray-400">체결 환율</th>
                <th className="px-10 py-3 text-sm font-medium text-left text-gray-400">매도 금액</th>
              </tr>
            </thead>
            <tbody>
              {dummyOrders.map(order => (
                <tr key={order.orderId} className="border-b border-gray-100">
                  <td className="px-10 py-3 text-sm text-gray-700">{order.orderId}</td>
                  <td className="px-10 py-3 text-sm text-gray-700">{order.orderDate}</td>
                  <td className="px-10 py-3 text-sm text-gray-700">
                    {order.buyAmount.toLocaleString('ko-KR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-10 py-3 text-sm text-gray-700">
                    {order.settledKRW.toLocaleString('ko-KR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-10 py-3 text-sm text-gray-700">{order.sellAmount.toLocaleString('ko-KR')}</td>
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
