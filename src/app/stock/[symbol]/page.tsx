'use client';

import React, { useState, useEffect } from 'react';
import { getHistoricalData, getNewsData, getSentimentData } from '@/lib/data';
import { stocksData } from '@/lib/data';
import { Stock, HistoricalDataPoint, NewsItem, SentimentAnalysis } from '@/types/stock';
import Link from 'next/link';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

interface StockDetailProps {
  params: {
    symbol: string;
  };
}

export default function StockDetail({ params }: StockDetailProps) {
  const { symbol } = params;
  const [stock, setStock] = useState<Stock | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [sentimentData, setSentimentData] = useState<SentimentAnalysis | null>(null);
  const [chartTimeframe, setChartTimeframe] = useState<'7d' | '14d' | '30d'>('30d');

  useEffect(() => {
    // Tìm thông tin cổ phiếu
    const stockInfo = stocksData.find(s => s.symbol === symbol);
    if (stockInfo) {
      setStock(stockInfo);
    }

    // Lấy dữ liệu lịch sử
    const histData = getHistoricalData(symbol);
    setHistoricalData(histData);

    // Lấy dữ liệu tin tức
    const news = getNewsData(symbol);
    setNewsData(news);

    // Lấy dữ liệu sentiment
    const sentiment = getSentimentData(symbol);
    setSentimentData(sentiment);
  }, [symbol]);

  // Lọc dữ liệu lịch sử theo khung thời gian
  const filteredHistoricalData = () => {
    if (chartTimeframe === '7d') {
      return historicalData.slice(-7);
    } else if (chartTimeframe === '14d') {
      return historicalData.slice(-14);
    }
    return historicalData;
  };

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

  if (!stock) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy cổ phiếu {symbol}</h1>
          <Link href="/stocks" className="text-blue-600 hover:text-blue-800">
            Quay lại danh sách cổ phiếu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{stock.symbol} - {stock.name}</h1>
          <p className="text-gray-600">{stock.industry}</p>
        </div>
        <Link href="/stocks" className="text-blue-600 hover:text-blue-800 mt-2 md:mt-0">
          Quay lại danh sách cổ phiếu
        </Link>
      </div>

      {/* Thông tin giá */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-2xl font-bold">{formatCurrency(stock.price)}</h2>
            <p className={`text-lg ${
              stock.change > 0 ? 'text-green-600' : stock.change < 0 ? 'text-red-600' : 'text-gray-500'
            }`}>
              {formatPercent(stock.change)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Khối lượng</p>
            <p className="text-lg">{stock.volume.toLocaleString('vi-VN')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Vốn hóa</p>
            <p className="text-lg">{formatCurrency(stock.marketCap)}</p>
          </div>
        </div>
      </div>

      {/* Biểu đồ giá */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Biểu đồ giá</h2>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded-md ${
                chartTimeframe === '7d' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setChartTimeframe('7d')}
            >
              7 ngày
            </button>
            <button
              className={`px-3 py-1 rounded-md ${
                chartTimeframe === '14d' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setChartTimeframe('14d')}
            >
              14 ngày
            </button>
            <button
              className={`px-3 py-1 rounded-md ${
                chartTimeframe === '30d' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setChartTimeframe('30d')}
            >
              30 ngày
            </button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredHistoricalData()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Giá']}
                labelFormatter={(label) => `Ngày: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#2563eb"
                name="Giá đóng cửa"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Phân tích sentiment */}
      {sentimentData && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Phân tích Sentiment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Sentiment tổng thể</p>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    sentimentData.overallSentiment === 'positive' 
                      ? 'bg-green-100 text-green-800' 
                      : sentimentData.overallSentiment === 'negative'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}>
                    {sentimentData.overallSentiment === 'positive' 
                      ? 'Tích cực' 
                      : sentimentData.overallSentiment === 'negative'
                        ? 'Tiêu cực'
                        : 'Trung tính'
                    }
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    (Điểm: {sentimentData.sentimentScore.toFixed(2)})
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Xu hướng gần đây</p>
                <p className="text-base">
                  {sentimentData.recentTrend === 'positive' || sentimentData.recentTrend === 'improving'
                    ? 'Đang cải thiện'
                    : sentimentData.recentTrend === 'negative' || sentimentData.recentTrend === 'deteriorating'
                      ? 'Đang xấu đi'
                      : 'Ổn định'
                  }
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tổng số tin tức phân tích</p>
                <p className="text-base">{sentimentData.totalNews} tin tức</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Tích cực', value: sentimentData.positiveNews, fill: '#10b981' },
                    { name: 'Trung tính', value: sentimentData.neutralNews, fill: '#6b7280' },
                    { name: 'Tiêu cực', value: sentimentData.negativeNews, fill: '#ef4444' },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Số lượng tin tức" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Tin tức */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Tin tức gần đây</h2>
        <div className="space-y-4">
          {newsData.map((news) => (
            <div key={news.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
              <h3 className="text-lg font-semibold mb-1">{news.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>{news.date}</span>
                <span className="mx-2">•</span>
                <span>{news.source}</span>
                <span className="mx-2">•</span>
                <span className={`${
                  news.sentiment === 'positive' 
                    ? 'text-green-600' 
                    : news.sentiment === 'negative'
                      ? 'text-red-600'
                      : 'text-gray-600'
                }`}>
                  {news.sentiment === 'positive' 
                    ? 'Tích cực' 
                    : news.sentiment === 'negative'
                      ? 'Tiêu cực'
                      : 'Trung tính'
                  }
                </span>
              </div>
              <p className="text-gray-700">{news.content}</p>
            </div>
          ))}
          
          {newsData.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              Không có tin tức gần đây cho cổ phiếu này
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
