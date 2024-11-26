import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const PortfolioCard = () => {
  const { data: portfolio, isLoading } = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Account')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div>Loading portfolio...</div>;
  }

  const valueChangeClass = portfolio?.balance > 0 
    ? "text-success-start" 
    : "text-danger-start";

  return (
    <Card className="bg-gradient-to-br from-primary-start/10 to-primary-end/5 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Portfolio Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Total Value</span>
            <span className="text-2xl font-semibold">
              ${portfolio?.balance.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Daily P&L</span>
            <span className={`text-lg font-medium ${valueChangeClass}`}>
              {portfolio?.balance > 0 ? '+' : ''}{portfolio?.balance.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;