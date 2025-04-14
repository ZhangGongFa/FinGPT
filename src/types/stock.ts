export interface Stock {
  symbol: string;
  name: string;
  industry: string;
  price: number;
  change: number;
  volume: number;
  marketCap: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
}

export interface HistoricalDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface NewsItem {
  id: number;
  symbol: string;
  title: string;
  content: string;
  date: string;
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
}

export interface SentimentAnalysis {
  symbol: string;
  overallSentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  positiveNews: number;
  negativeNews: number;
  neutralNews: number;
  totalNews: number;
  recentTrend: string;
}

export interface IndustryAnalysis {
  industry: string;
  stockCount: number;
  averageSentiment: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface MarketAnalysis {
  date: string;
  totalStocks: number;
  positiveStocks: number;
  negativeStocks: number;
  neutralStocks: number;
  averageSentiment: number;
  marketSentiment: 'positive' | 'negative' | 'neutral';
  topIndustries: IndustryAnalysis[];
  bottomIndustries: IndustryAnalysis[];
  industryAnalysis: IndustryAnalysis[];
}
