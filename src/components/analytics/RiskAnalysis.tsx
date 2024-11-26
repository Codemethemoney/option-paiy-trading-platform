import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const RiskAnalysis = () => {
  const { data: riskData, isLoading } = useQuery({
    queryKey: ['risk-analysis'],
    queryFn: async () => {
      const { data: riskMetrics, error } = await supabase
        .from('RiskMetric')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(7);
      
      if (error) throw error;
      return riskMetrics;
    }
  });

  if (isLoading) {
    return <div>Loading risk analysis...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {riskData?.map((metric) => (
              <div key={metric.id} className="p-4 border rounded-lg">
                <div className="text-sm text-gray-500">{new Date(metric.timestamp).toLocaleDateString()}</div>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAnalysis;