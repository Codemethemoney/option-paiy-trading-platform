import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const MarketIntelligence = () => {
  const { data: marketData, isLoading } = useQuery({
    queryKey: ['market-intelligence'],
    queryFn: async () => {
      const response = await fetch('/api/functions/v1/market-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'market-intelligence' })
      });
      
      if (!response.ok) throw new Error('Failed to fetch market intelligence');
      return response.json();
    }
  });

  if (isLoading) {
    return <div>Loading market intelligence...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Intelligence</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Market Regime</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Current</span>
                  <span className="font-medium">{marketData?.regime?.current}</span>
                </div>
                <div className="flex justify-between">
                  <span>Confidence</span>
                  <span className="font-medium">{marketData?.regime?.probability}%</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Sentiment</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Overall</span>
                  <span className="font-medium">{marketData?.sentiment?.overall}</span>
                </div>
                <div className="flex justify-between">
                  <span>Trend</span>
                  <span className="font-medium">{marketData?.sentiment?.trend}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketIntelligence;