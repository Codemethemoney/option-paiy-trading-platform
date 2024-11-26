import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { AIInsightContent, PortfolioMetrics } from "@/types/analytics";

const PortfolioAnalytics = () => {
  const { data: analytics, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ['portfolio-analytics'],
    queryFn: async () => {
      const { data: riskMetrics, error } = await supabase
        .from('RiskMetric')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      return riskMetrics?.[0] as PortfolioMetrics || {
        portfolioValue: 0,
        valueAtRisk: 0,
        sharpeRatio: 0,
        delta: 0,
        gamma: 0,
        theta: 0,
        vega: 0,
        beta: 0,
        alpha: 0,
        informationRatio: 0,
        sortinoRatio: 0,
        maxDrawdown: 0
      };
    }
  });

  const { data: aiInsights, isLoading: isLoadingInsights } = useQuery({
    queryKey: ['ai-insights'],
    queryFn: async () => {
      const { data: insights, error } = await supabase
        .from('AIInsight')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      // Provide default values if no insights are found
      if (!insights?.length) {
        return {
          content: { analysis: 'No AI insights available yet.' },
          confidence: 0,
          timestamp: new Date().toISOString()
        };
      }
      
      return {
        ...insights[0],
        content: insights[0]?.content as AIInsightContent || { analysis: 'Error loading AI insights.' }
      };
    }
  });

  if (isLoadingAnalytics || isLoadingInsights) {
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
            <div className="flex justify-between">
              <span>Information Ratio</span>
              <span className="font-semibold">{analytics?.informationRatio?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Sortino Ratio</span>
              <span className="font-semibold">{analytics?.sortinoRatio?.toFixed(2)}</span>
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

      {aiInsights && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">{aiInsights.content?.analysis || 'No analysis available.'}</p>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Confidence: {((aiInsights.confidence || 0) * 100).toFixed(0)}%</span>
                <span>Generated: {new Date(aiInsights.timestamp).toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PortfolioAnalytics;