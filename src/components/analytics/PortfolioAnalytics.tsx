import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PortfolioAnalytics = () => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['portfolio-analytics'],
    queryFn: async () => {
      const { data: riskMetrics, error } = await supabase
        .from('RiskMetric')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1)
        .single();
      
      if (error) throw error;
      return riskMetrics;
    }
  });

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Portfolio Value</span>
              <span className="font-semibold">${analytics?.portfolioValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Value at Risk</span>
              <span className="font-semibold">${analytics?.valueAtRisk.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Sharpe Ratio</span>
              <span className="font-semibold">{analytics?.sharpeRatio?.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Greeks Exposure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Delta</span>
              <span className="font-semibold">{analytics?.delta?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Gamma</span>
              <span className="font-semibold">{analytics?.gamma?.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span>Theta</span>
              <span className="font-semibold">{analytics?.theta?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Vega</span>
              <span className="font-semibold">{analytics?.vega?.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioAnalytics;