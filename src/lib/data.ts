import { Stock } from '@/types/stock';

// Mẫu dữ liệu cổ phiếu VN30
export const stocksData: Stock[] = [
  {
    symbol: 'ACB',
    name: 'Ngân hàng TMCP Á Châu',
    industry: 'Ngân hàng',
    price: 25600,
    change: 1.2,
    volume: 2345678,
    marketCap: 68500000000000,
    sentiment: 'positive',
    sentimentScore: 0.72,
  },
  {
    symbol: 'BID',
    name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
    industry: 'Ngân hàng',
    price: 45200,
    change: -0.8,
    volume: 1234567,
    marketCap: 215000000000000,
    sentiment: 'neutral',
    sentimentScore: 0.05,
  },
  {
    symbol: 'BVH',
    name: 'Tập đoàn Bảo Việt',
    industry: 'Bảo hiểm',
    price: 49800,
    change: 0.5,
    volume: 876543,
    marketCap: 37000000000000,
    sentiment: 'positive',
    sentimentScore: 0.45,
  },
  {
    symbol: 'CTG',
    name: 'Ngân hàng TMCP Công Thương Việt Nam',
    industry: 'Ngân hàng',
    price: 32100,
    change: -1.5,
    volume: 3456789,
    marketCap: 154000000000000,
    sentiment: 'negative',
    sentimentScore: -0.38,
  },
  {
    symbol: 'FPT',
    name: 'Công ty Cổ phần FPT',
    industry: 'Công nghệ',
    price: 112500,
    change: 2.3,
    volume: 1987654,
    marketCap: 135000000000000,
    sentiment: 'positive',
    sentimentScore: 0.85,
  },
  {
    symbol: 'GAS',
    name: 'Tổng Công ty Khí Việt Nam',
    industry: 'Dầu khí',
    price: 98700,
    change: 1.7,
    volume: 765432,
    marketCap: 189000000000000,
    sentiment: 'positive',
    sentimentScore: 0.62,
  },
  {
    symbol: 'HPG',
    name: 'Công ty Cổ phần Tập đoàn Hòa Phát',
    industry: 'Thép',
    price: 27800,
    change: -0.3,
    volume: 5678901,
    marketCap: 124000000000000,
    sentiment: 'neutral',
    sentimentScore: -0.12,
  },
  {
    symbol: 'MBB',
    name: 'Ngân hàng TMCP Quân đội',
    industry: 'Ngân hàng',
    price: 23400,
    change: 0.9,
    volume: 3210987,
    marketCap: 88500000000000,
    sentiment: 'positive',
    sentimentScore: 0.53,
  },
  {
    symbol: 'MSN',
    name: 'Công ty Cổ phần Tập đoàn Masan',
    industry: 'Hàng tiêu dùng',
    price: 87600,
    change: -1.2,
    volume: 876543,
    marketCap: 103000000000000,
    sentiment: 'negative',
    sentimentScore: -0.45,
  },
  {
    symbol: 'MWG',
    name: 'Công ty Cổ phần Đầu tư Thế Giới Di Động',
    industry: 'Bán lẻ',
    price: 56700,
    change: 3.2,
    volume: 1543210,
    marketCap: 82000000000000,
    sentiment: 'positive',
    sentimentScore: 0.78,
  },
  {
    symbol: 'NVL',
    name: 'Công ty Cổ phần Tập đoàn Đầu tư Địa ốc No Va',
    industry: 'Bất động sản',
    price: 15600,
    change: -2.5,
    volume: 4321098,
    marketCap: 58000000000000,
    sentiment: 'negative',
    sentimentScore: -0.67,
  },
  {
    symbol: 'PLX',
    name: 'Tập đoàn Xăng dầu Việt Nam',
    industry: 'Năng lượng',
    price: 45300,
    change: 0.7,
    volume: 987654,
    marketCap: 58700000000000,
    sentiment: 'neutral',
    sentimentScore: 0.18,
  },
  {
    symbol: 'POW',
    name: 'Tổng Công ty Điện lực Dầu khí Việt Nam',
    industry: 'Điện lực',
    price: 12300,
    change: -0.5,
    volume: 6543210,
    marketCap: 28900000000000,
    sentiment: 'neutral',
    sentimentScore: -0.08,
  },
  {
    symbol: 'SAB',
    name: 'Tổng Công ty Cổ phần Bia - Rượu - Nước giải khát Sài Gòn',
    industry: 'Đồ uống',
    price: 156700,
    change: 0.3,
    volume: 432109,
    marketCap: 100500000000000,
    sentiment: 'positive',
    sentimentScore: 0.32,
  },
  {
    symbol: 'SSI',
    name: 'Công ty Cổ phần Chứng khoán SSI',
    industry: 'Chứng khoán',
    price: 32100,
    change: 1.8,
    volume: 2109876,
    marketCap: 39800000000000,
    sentiment: 'positive',
    sentimentScore: 0.65,
  },
  {
    symbol: 'STB',
    name: 'Ngân hàng TMCP Sài Gòn Thương Tín',
    industry: 'Ngân hàng',
    price: 28900,
    change: -0.2,
    volume: 3456789,
    marketCap: 54600000000000,
    sentiment: 'neutral',
    sentimentScore: -0.15,
  },
  {
    symbol: 'TCB',
    name: 'Ngân hàng TMCP Kỹ Thương Việt Nam',
    industry: 'Ngân hàng',
    price: 34500,
    change: 1.5,
    volume: 2345678,
    marketCap: 121000000000000,
    sentiment: 'positive',
    sentimentScore: 0.58,
  },
  {
    symbol: 'TPB',
    name: 'Ngân hàng TMCP Tiên Phong',
    industry: 'Ngân hàng',
    price: 21800,
    change: -0.7,
    volume: 1234567,
    marketCap: 29300000000000,
    sentiment: 'neutral',
    sentimentScore: -0.22,
  },
  {
    symbol: 'VCB',
    name: 'Ngân hàng TMCP Ngoại thương Việt Nam',
    industry: 'Ngân hàng',
    price: 89700,
    change: 0.8,
    volume: 1098765,
    marketCap: 333000000000000,
    sentiment: 'positive',
    sentimentScore: 0.42,
  },
  {
    symbol: 'VHM',
    name: 'Công ty Cổ phần Vinhomes',
    industry: 'Bất động sản',
    price: 45600,
    change: -1.3,
    volume: 2345678,
    marketCap: 198000000000000,
    sentiment: 'negative',
    sentimentScore: -0.35,
  },
  {
    symbol: 'VIC',
    name: 'Tập đoàn Vingroup',
    industry: 'Đa ngành',
    price: 56700,
    change: -0.5,
    volume: 1234567,
    marketCap: 215000000000000,
    sentiment: 'neutral',
    sentimentScore: -0.18,
  },
  {
    symbol: 'VJC',
    name: 'Công ty Cổ phần Hàng không Vietjet',
    industry: 'Hàng không',
    price: 123400,
    change: 2.1,
    volume: 654321,
    marketCap: 67000000000000,
    sentiment: 'positive',
    sentimentScore: 0.75,
  },
  {
    symbol: 'VNM',
    name: 'Công ty Cổ phần Sữa Việt Nam',
    industry: 'Thực phẩm',
    price: 76500,
    change: 0.6,
    volume: 987654,
    marketCap: 159000000000000,
    sentiment: 'positive',
    sentimentScore: 0.48,
  },
  {
    symbol: 'VPB',
    name: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
    industry: 'Ngân hàng',
    price: 19800,
    change: -1.8,
    volume: 4567890,
    marketCap: 88000000000000,
    sentiment: 'negative',
    sentimentScore: -0.52,
  },
  {
    symbol: 'VRE',
    name: 'Công ty Cổ phần Vincom Retail',
    industry: 'Bất động sản',
    price: 25600,
    change: 0.4,
    volume: 1234567,
    marketCap: 59800000000000,
    sentiment: 'neutral',
    sentimentScore: 0.25,
  },
];

// Dữ liệu lịch sử giá cho biểu đồ
export const getHistoricalData = (symbol: string) => {
  // Tạo dữ liệu giả cho 30 ngày
  const today = new Date();
  const data = [];
  
  // Tìm giá hiện tại của cổ phiếu
  const stock = stocksData.find(s => s.symbol === symbol);
  const currentPrice = stock ? stock.price : 50000; // Giá mặc định nếu không tìm thấy
  
  // Tạo biến động giá ngẫu nhiên nhưng có xu hướng
  let price = currentPrice * 0.85; // Bắt đầu từ giá thấp hơn hiện tại
  const trend = Math.random() > 0.5 ? 1 : -1; // Xu hướng tăng hoặc giảm
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Tạo biến động giá với xu hướng
    const change = (Math.random() * 0.03 - 0.015 + trend * 0.005) * price;
    price += change;
    
    // Đảm bảo giá không âm
    price = Math.max(price, 100);
    
    // Tạo giá cao, thấp, mở cửa dựa trên giá đóng cửa
    const high = price * (1 + Math.random() * 0.02);
    const low = price * (1 - Math.random() * 0.02);
    const open = low + Math.random() * (high - low);
    
    // Tạo khối lượng giao dịch
    const volume = Math.floor(Math.random() * 5000000) + 500000;
    
    data.push({
      date: date.toISOString().split('T')[0],
      open: Math.round(open),
      high: Math.round(high),
      low: Math.round(low),
      close: Math.round(price),
      volume: volume,
    });
  }
  
  return data;
};

// Dữ liệu tin tức
export const getNewsData = (symbol: string) => {
  const newsItems = [
    {
      id: 1,
      symbol: symbol,
      title: `${symbol} công bố kết quả kinh doanh quý 1 vượt kỳ vọng`,
      content: `Công ty Cổ phần ${stocksData.find(s => s.symbol === symbol)?.name || symbol} vừa công bố kết quả kinh doanh quý 1/2025 với doanh thu và lợi nhuận vượt kỳ vọng của thị trường. Cụ thể, doanh thu đạt 5.678 tỷ đồng, tăng 15% so với cùng kỳ năm trước, lợi nhuận sau thuế đạt 789 tỷ đồng, tăng 22%.`,
      date: '2025-04-10',
      source: 'CafeF',
      sentiment: 'positive',
      sentimentScore: 0.78,
    },
    {
      id: 2,
      symbol: symbol,
      title: `${symbol} dự kiến phát hành cổ phiếu tăng vốn`,
      content: `Hội đồng quản trị ${stocksData.find(s => s.symbol === symbol)?.name || symbol} vừa thông qua phương án phát hành cổ phiếu để tăng vốn điều lệ. Theo đó, công ty sẽ phát hành thêm 100 triệu cổ phiếu với giá 10.000 đồng/cổ phiếu, dự kiến thu về 1.000 tỷ đồng để đầu tư vào các dự án mới.`,
      date: '2025-04-05',
      source: 'VnEconomy',
      sentiment: 'neutral',
      sentimentScore: 0.15,
    },
    {
      id: 3,
      symbol: symbol,
      title: `${symbol} bị phạt do vi phạm quy định công bố thông tin`,
      content: `Ủy ban Chứng khoán Nhà nước vừa ra quyết định xử phạt ${stocksData.find(s => s.symbol === symbol)?.name || symbol} 150 triệu đồng do vi phạm quy định về công bố thông tin. Cụ thể, công ty đã chậm công bố thông tin về việc thay đổi nhân sự cấp cao và một số thông tin quan trọng khác.`,
      date: '2025-03-28',
      source: 'VnExpress',
      sentiment: 'negative',
      sentimentScore: -0.65,
    },
    {
      id: 4,
      symbol: symbol,
      title: `${symbol} ký kết hợp đồng hợp tác chiến lược với đối tác nước ngoài`,
      content: `${stocksData.find(s => s.symbol === symbol)?.name || symbol} vừa ký kết hợp đồng hợp tác chiến lược với một đối tác lớn từ Nhật Bản. Theo thỏa thuận, hai bên sẽ cùng phát triển các sản phẩm mới và mở rộng thị trường trong khu vực Đông Nam Á. Giá trị hợp đồng ước tính khoảng 500 triệu USD trong 5 năm.`,
      date: '2025-03-20',
      source: 'CafeF',
      sentiment: 'positive',
      sentimentScore: 0.82,
    },
    {
      id: 5,
      symbol: symbol,
      title: `Chuyên gia phân tích đánh giá triển vọng cổ phiếu ${symbol}`,
      content: `Các chuyên gia phân tích từ công ty chứng khoán SSI vừa đưa ra báo cáo đánh giá về cổ phiếu ${symbol}. Theo đó, với tình hình kinh doanh hiện tại và triển vọng ngành, cổ phiếu ${symbol} được đánh giá ở mức "Trung lập" với giá mục tiêu trong 12 tháng tới là ${Math.round((stocksData.find(s => s.symbol === symbol)?.price || 50000) * 1.1).toLocaleString('vi-VN')} đồng.`,
      date: '2025-03-15',
      source: 'SSI Research',
      sentiment: 'neutral',
      sentimentScore: 0.05,
    },
  ];
  
  return newsItems;
};

// Dữ liệu phân tích sentiment
export const getSentimentData = (symbol: string) => {
  const stock = stocksData.find(s => s.symbol === symbol);
  
  if (!stock) {
    return {
      symbol: symbol,
      overallSentiment: 'neutral',
      sentimentScore: 0,
      positiveNews: 0,
      negativeNews: 0,
      neutralNews: 0,
      recentTrend: 'stable',
    };
  }
  
  // Tạo dữ liệu phân tích sentiment
  const sentimentScore = stock.sentimentScore;
  let overallSentiment = 'neutral';
  
  if (sentimentScore > 0.3) {
    overallSentiment = 'positive';
  } else if (sentimentScore < -0.3) {
    overallSentiment = 'negative';
  }
  
  // Tạo số lượng tin tức theo sentiment
  const totalNews = Math.floor(Math.random() * 20) + 10;
  let positiveNews, negativeNews, neutralNews;
  
  if (overallSentiment === 'positive') {
    positiveNews = Math.floor(totalNews * (0.5 + Math.random() * 0.3));
    negativeNews = Math.floor(totalNews * Math.random() * 0.2);
    neutralNews = totalNews - positiveNews - negativeNews;
  } else if (overallSentiment === 'negative') {
    negativeNews = Math.floor(totalNews * (0.5 + Math.random() * 0.3));
    positiveNews = Math.floor(totalNews * Math.random() * 0.2);
    neutralNews = totalNews - positiveNews - negativeNews;
  } else {
    neutralNews = Math.floor(totalNews * (0.4 + Math.random() * 0.2));
    positiveNews = Math.floor((totalNews - neutralNews) / 2);
    negativeNews = totalNews - positiveNews - neutralNews;
  }
  
  // Xác định xu hướng gần đây
  const recentTrend = Math.random() > 0.6 ? overallSentiment : 
                     (Math.random() > 0.5 ? 'improving' : 'deteriorating');
  
  return {
    symbol: symbol,
    overallSentiment: overallSentiment,
    sentimentScore: sentimentScore,
    positiveNews: positiveNews,
    negativeNews: negativeNews,
    neutralNews: neutralNews,
    totalNews: totalNews,
    recentTrend: recentTrend,
  };
};

// Dữ liệu phân tích thị trường
export const getMarketAnalysis = () => {
  // Tính toán sentiment tổng thể của thị trường
  const totalStocks = stocksData.length;
  const positiveStocks = stocksData.filter(s => s.sentimentScore > 0.3).length;
  const negativeStocks = stocksData.filter(s => s.sentimentScore < -0.3).length;
  const neutralStocks = totalStocks - positiveStocks - negativeStocks;
  
  const averageSentiment = stocksData.reduce((sum, stock) => sum + stock.sentimentScore, 0) / totalStocks;
  
  let marketSentiment = 'neutral';
  if (averageSentiment > 0.2) {
    marketSentiment = 'positive';
  } else if (averageSentiment < -0.2) {
    marketSentiment = 'negative';
  }
  
  // Tạo dữ liệu phân tích ngành
  const industries = [...new Set(stocksData.map(s => s.industry))];
  const industryAnalysis = industries.map(industry => {
    const industryStocks = stocksData.filter(s => s.industry === industry);
    const avgSentiment = industryStocks.reduce((sum, stock) => sum + stock.sentimentScore, 0) / industryStocks.length;
    
    let industrySentiment = 'neutral';
    if (avgSentiment > 0.2) {
      industrySentiment = 'positive';
    } else if (avgSentiment < -0.2) {
      industrySentiment = 'negative';
    }
    
    return {
      industry: industry,
      stockCount: industryStocks.length,
      averageSentiment: avgSentiment,
      sentiment: industrySentiment,
    };
  });
  
  // Sắp xếp ngành theo sentiment
  industryAnalysis.sort((a, b) => b.averageSentiment - a.averageSentiment);
  
  return {
    date: new Date().toISOString().split('T')[0],
    totalStocks: totalStocks,
    positiveStocks: positiveStocks,
    negativeStocks: negativeStocks,
    neutralStocks: neutralStocks,
    averageSentiment: averageSentiment,
    marketSentiment: marketSentiment,
    topIndustries: industryAnalysis.slice(0, 3),
    bottomIndustries: industryAnalysis.slice(-3).reverse(),
    industryAnalysis: industryAnalysis,
  };
};
