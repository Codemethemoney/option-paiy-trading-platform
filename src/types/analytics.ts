export interface MarketRegime {
  current: string;
  probability: number;
  indicators: {
    volatility: number;
    momentum: number;
    liquidity: number;
    sentiment: number;
  };
}

export interface SentimentAnalysis {
  overall: string;
  components: {
    news: number;
    social: number;
    technical: number;
    fundamental: number;
  };
}

export interface AIRecommendations {
  suggestions: string[];
}

export interface AIInsightContent {
  analysis: string;
}

export interface PortfolioMetrics {
  portfolioValue: number;
  valueAtRisk: number;
  sharpeRatio: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  beta: number;
  alpha: number;
  informationRatio: number;
  sortinoRatio: number;
  maxDrawdown: number;
}