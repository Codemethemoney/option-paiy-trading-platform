import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface AIRecommendations {
  suggestions: string[];
}

const RiskAnalysis = () => {
  const { data: riskData, isLoading } = useQuery({
    queryKey: ['risk-analysis'],
    queryFn: async () => {
      const { data: riskMetrics, error } = await supabase
        .from('RiskMetric')
        .select(`
          id,
          timestamp,
          valueAtRisk,
          delta,
          assetAllocation,
          sectorExposure,
          correlationMatrix,
          aiRecommendations
        `)
        .order('timestamp', { ascending: false })
        .limit(7);
      
      if (error) throw error;
      return riskMetrics.map(metric => ({
        ...metric,
        aiRecommendations: metric.aiRecommendations as AIRecommendations
      }));
    }
  });

  if (isLoading) {
    return <div>Loading risk analysis...</div>;
  }

  const latestRisk = riskData?.[0];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Risk Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Asset Allocation</h3>
              <div className="space-y-2">
                {latestRisk?.assetAllocation && Object.entries(latestRisk.assetAllocation as Record<string, number>).map(([asset, allocation]) => (
                  <div key={asset} className="flex justify-between">
                    <span>{asset}</span>
                    <span className="font-medium">{(Number(allocation) * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Sector Exposure</h3>
              <div className="space-y-2">
                {latestRisk?.sectorExposure && Object.entries(latestRisk.sectorExposure as Record<string, number>).map(([sector, exposure]) => (
                  <div key={sector} className="flex justify-between">
                    <span>{sector}</span>
                    <span className="font-medium">{(Number(exposure) * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {latestRisk?.aiRecommendations && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
              <div className="space-y-2">
                {latestRisk.aiRecommendations.suggestions?.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historical Risk Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {riskData?.map((metric) => (
              <div key={metric.id} className="p-4 border rounded-lg">
                <div className="text-sm text-gray-500">
                  {new Date(metric.timestamp).toLocaleDateString()}
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span>VaR</span>
                    <span className="font-medium">${metric.valueAtRisk.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delta</span>
                    <span className="font-medium">{metric.delta?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAnalysis;