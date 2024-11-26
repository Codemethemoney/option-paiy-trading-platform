import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from "@/integrations/supabase/client";

const MarketAnalysis = ({ symbol }: { symbol: string }) => {
  const { data: marketData, isLoading } = useQuery({
    queryKey: ['market-data', symbol],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('market-data', {
        body: { symbol }
      });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div>Loading market analysis...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Analysis - {symbol}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketData}>
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketAnalysis;