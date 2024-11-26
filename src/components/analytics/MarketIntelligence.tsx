import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { MarketRegime, SentimentAnalysis } from "@/types/analytics";

const MarketIntelligence = () => {
  const { data: marketData, isLoading } = useQuery({
    queryKey: ['market-intelligence'],
    queryFn: async () => {
      const { data: riskMetrics, error } = await supabase
        .from('RiskMetric')
        .select('marketRegime, sentimentAnalysis')
        .order('timestamp', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      return {
        marketRegime: (riskMetrics?.[0]?.marketRegime as unknown as MarketRegime) || {
          current: 'Unknown',
          probability: 0,
          indicators: {
            volatility: 0,
            momentum: 0,
            liquidity: 0,
            sentiment: 0
          }
        },
        sentimentAnalysis: (riskMetrics?.[0]?.sentimentAnalysis as unknown as SentimentAnalysis) || {
          overall: 'Neutral',
          components: {
            news: 0,
            social: 0,
            technical: 0,
            fundamental: 0
          }
        }
      };
    }
  });

  if (isLoading) {
    return <div>Loading market intelligence...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Market Regime</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Current Regime</span>
                <span className="font-medium">{marketData.marketRegime.current}</span>
              </div>
              <div className="flex justify-between">
                <span>Confidence</span>
                <span className="font-medium">
                  {(marketData.marketRegime.probability * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Indicators</h3>
              {Object.entries(marketData.marketRegime.indicators).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="capitalize">{key}</span>
                  <span className="font-medium">{(Number(value) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Sentiment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span>Overall Sentiment</span>
              <span className="font-medium">{marketData.sentimentAnalysis.overall}</span>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Components</h3>
              {Object.entries(marketData.sentimentAnalysis.components).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="capitalize">{key}</span>
                  <span className="font-medium">{(Number(value) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketIntelligence;