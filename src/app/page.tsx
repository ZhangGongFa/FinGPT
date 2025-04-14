'use client';

import React, { useState, useEffect } from 'react';
import { getMarketAnalysis, stocksData } from '@/lib/data';
import { Stock, MarketAnalysis } from '@/types/stock';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function Home() {
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysis | null>(null);
  const [topStocks, setTopStocks] = useState<Stock[]>([]);
  const [bottomStocks, setBottomStocks] = useState<Stock[]>([]);

  useEffect(() => {
    // Lấy phân tích thị trường
    const analysis = getMarketAnalysis();
    setMarketAnalysis(analysis);

    // Lấy top 5 cổ phiếu có sentiment tốt nhất
    const sortedByPositive = [...stocksData].sort((a, b) => b.sentimentScore - a.sentimentScore);
    setTopStocks(sortedByPositive.slice(0, 5));

    // Lấy top 5 cổ phiếu có sentiment kém nhất
    const sortedByNegative = [...stocksData].sort((a, b) => a.sentimentScore - b.sentimentScore);
    setBottomStocks(sortedByNegative.slice(0, 5));
  }, []);

  // Định dạng số tiền VND
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Định dạng phần trăm
  const formatPercent = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  // Màu sắc cho biểu đồ
  const COLORS = ['#10b981', '#6b7280', '#ef4444'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">FinGPT Việt Nam</h1>
        <p className="text-xl text-gray-600">
          Phân tích sentiment cổ phiếu Việt Nam sử dụng trí tuệ nhân tạo
        </p>
      </div>

      {/* Phân tích thị trường */}
      {marketAnalysis && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Phân tích thị trường</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Sentiment thị trường</h3>
              <div className="flex items-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  marketAnalysis.marketSentiment === 'positive' 
                    ? 'bg-green-100 text-green-800' 
                    : marketAnalysis.marketSentiment === 'negative'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                }`}>
                  {marketAnalysis.marketSentiment === 'positive' 
                    ? 'Tích cực' 
                    : marketAnalysis.marketSentiment === 'negative'
                      ? 'Tiêu cực'
                      : 'Trung tính'
                  }
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  (Điểm: {marketAnalysis.averageSentiment.toFixed(2)})
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Ngành tích cực nhất</h3>
              {marketAnalysis.topIndustries.length > 0 ? (
                <div>
                  <p className="font-medium">{marketAnalysis.topIndustries[0].industry}</p>
                  <p className="text-sm text-gray-600">
                    Điểm sentiment: {marketAnalysis.topIndustries[0].averageSentiment.toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">Không có dữ liệu</p>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Ngành tiêu cực nhất</h3>
              {marketAnalysis.bottomIndustries.length > 0 ? (
                <div>
                  <p className="font-medium">{marketAnalysis.bottomIndustries[0].industry}</p>
                  <p className="text-sm text-gray-600">
                    Điểm sentiment: {marketAnalysis.bottomIndustries[0].averageSentiment.toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">Không có dữ liệu</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Phân bố sentiment</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Tích cực', value: marketAnalysis.positiveStocks },
                        { name: 'Trung tính', value: marketAnalysis.neutralStocks },
                        { name: 'Tiêu cực', value: marketAnalysis.negativeStocks },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { name: 'Tích cực', value: marketAnalysis.positiveStocks },
                        { name: 'Trung tính', value: marketAnalysis.neutralStocks },
                        { name: 'Tiêu cực', value: marketAnalysis.negativeStocks },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} cổ phiếu`, '']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Phân tích ngành</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={marketAnalysis.industryAnalysis.slice(0, 5)}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[-1, 1]} />
                    <YAxis dataKey="industry" type="category" width={100} />
                    <Tooltip formatter={(value) => [value.toFixed(2), 'Điểm sentiment']} />
                    <Legend />
                    <Bar 
                      dataKey="averageSentiment" 
                      name="Điểm sentiment" 
                      fill="#3b82f6"
                      background={{ fill: '#eee' }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top cổ phiếu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Top 5 cổ phiếu tích cực nhất</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã CP
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sentiment
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topStocks.map((stock) => (
                  <tr key={stock.symbol} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Link href={`/stock/${stock.symbol}`} className="text-blue-600 hover:text-blue-900 font-medium">
                        {stock.symbol}
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {stock.name.length > 30 ? `${stock.name.substring(0, 30)}...` : stock.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                      {formatCurrency(stock.price)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-green-600">
                      {stock.sentimentScore.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Top 5 cổ phiếu tiêu cực nhất</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã CP
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sentiment
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bottomStocks.map((stock) => (
                  <tr key={stock.symbol} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Link href={`/stock/${stock.symbol}`} className="text-blue-600 hover:text-blue-900 font-medium">
                        {stock.symbol}
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {stock.name.length > 30 ? `${stock.name.substring(0, 30)}...` : stock.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                      {formatCurrency(stock.price)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-red-600">
                      {stock.sentimentScore.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-blue-50 rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Khám phá tất cả cổ phiếu</h2>
        <p className="text-lg text-gray-700 mb-6">
          Tìm kiếm, lọc và phân tích chi tiết các cổ phiếu Việt Nam với công cụ FinGPT
        </p>
        <Link 
          href="/stocks" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Xem danh sách cổ phiếu
        </Link>
      </div>
    </div>
  );
}
