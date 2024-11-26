import { useEffect } from 'react';
import PortfolioCard from '@/components/dashboard/PortfolioCard';
import OptionsChain from '@/components/dashboard/OptionsChain';
import MarketAnalysis from '@/components/dashboard/MarketAnalysis';
import TradingInterface from '@/components/dashboard/TradingInterface';
import PortfolioAnalytics from '@/components/analytics/PortfolioAnalytics';
import MarketIntelligence from '@/components/analytics/MarketIntelligence';
import RiskAnalysis from '@/components/analytics/RiskAnalysis';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Trading Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PortfolioCard />
        <TradingInterface />
      </div>
      
      <PortfolioAnalytics />
      
      <div className="grid grid-cols-1 gap-6">
        <MarketIntelligence />
        <MarketAnalysis symbol="BTC-USD" />
        <RiskAnalysis />
        <OptionsChain symbol="BTC-USD" />
      </div>
    </div>
  );
};

export default Dashboard;