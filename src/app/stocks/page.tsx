'use client';

import React, { useState, useEffect } from 'react';
import { stocksData } from '@/lib/data';
import { Stock } from '@/types/stock';
import Link from 'next/link';

export default function StockSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('');
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>(stocksData);
  const [industries, setIndustries] = useState<string[]>([]);

  useEffect(() => {
    // Lấy danh sách các ngành duy nhất
    const uniqueIndustries = [...new Set(stocksData.map(stock => stock.industry))];
    setIndustries(uniqueIndustries);
  }, []);

  useEffect(() => {
    // Lọc cổ phiếu dựa trên các điều kiện tìm kiếm
    let results = stocksData;

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        stock => 
          stock.symbol.toLowerCase().includes(term) || 
          stock.name.toLowerCase().includes(term)
      );
    }

    // Lọc theo ngành
    if (industryFilter) {
      results = results.filter(stock => stock.industry === industryFilter);
    }

    // Lọc theo sentiment
    if (sentimentFilter) {
      results = results.filter(stock => stock.sentiment === sentimentFilter);
    }

    setFilteredStocks(results);
  }, [searchTerm, industryFilter, sentimentFilter]);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Tìm kiếm cổ phiếu</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Ô tìm kiếm */}
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Tìm kiếm theo mã hoặc tên
            </label>
            <input
              type="text"
              id="search"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mã hoặc tên cổ phiếu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Lọc theo ngành */}
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
              Lọc theo ngành
            </label>
            <select
              id="industry"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
            >
              <option value="">Tất cả ngành</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
          
          {/* Lọc theo sentiment */}
          <div>
            <label htmlFor="sentiment" className="block text-sm font-medium text-gray-700 mb-1">
              Lọc theo sentiment
            </label>
            <select
              id="sentiment"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value)}
            >
              <option value="">Tất cả sentiment</option>
              <option value="positive">Tích cực</option>
              <option value="neutral">Trung tính</option>
              <option value="negative">Tiêu cực</option>
            </select>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 mb-2">
          Hiển thị {filteredStocks.length} / {stocksData.length} cổ phiếu
        </div>
      </div>
      
      {/* Bảng kết quả */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã CP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên công ty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngành
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thay đổi
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sentiment
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chi tiết
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStocks.map((stock) => (
                <tr key={stock.symbol} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {stock.symbol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {stock.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stock.industry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(stock.price)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
                    stock.change > 0 ? 'text-green-600' : stock.change < 0 ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {formatPercent(stock.change)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      stock.sentiment === 'positive' 
                        ? 'bg-green-100 text-green-800' 
                        : stock.sentiment === 'negative'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {stock.sentiment === 'positive' 
                        ? 'Tích cực' 
                        : stock.sentiment === 'negative'
                          ? 'Tiêu cực'
                          : 'Trung tính'
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <Link 
                      href={`/stock/${stock.symbol}`}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      Xem chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
              
              {filteredStocks.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    Không tìm thấy cổ phiếu phù hợp với điều kiện tìm kiếm
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
