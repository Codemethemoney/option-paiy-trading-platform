import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { OrderEntry } from '@/types/trading';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const AdvancedOrderEntry = () => {
  const { toast } = useToast();
  const [orderDetails, setOrderDetails] = useState<OrderEntry>({
    basic: {
      symbol: '',
      side: 'buy',
      type: 'market',
      quantity: 0,
      price: undefined,
      stopPrice: undefined,
    },
    advanced: {
      timeInForce: 'day',
      allowOutsideRth: false,
      minQuantity: undefined,
      displayQuantity: undefined,
    },
    riskManagement: {}
  });

  const { data: marketData } = useQuery({
    queryKey: ['market-data', orderDetails.basic.symbol],
    queryFn: async () => {
      const response = await fetch('/api/functions/v1/market-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: orderDetails.basic.symbol })
      });
      if (!response.ok) throw new Error('Failed to fetch market data');
      return response.json();
    },
    enabled: !!orderDetails.basic.symbol
  });

  const handleSubmitOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('Transaction')
        .insert({
          type: 'TRADE',
          amount: orderDetails.basic.quantity * (marketData?.price || 0),
          currency: orderDetails.basic.symbol.split('/')[1] || 'USD',
          status: 'PENDING',
          description: `${orderDetails.basic.side.toUpperCase()} ${orderDetails.basic.quantity} ${orderDetails.basic.symbol}`
        });

      if (error) throw error;

      toast({
        title: "Order Submitted",
        description: "Your order has been successfully submitted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Advanced Order Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="risk">Risk Management</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-2">
              <label>Symbol</label>
              <Input
                value={orderDetails.basic.symbol}
                onChange={(e) => setOrderDetails(prev => ({
                  ...prev,
                  basic: { ...prev.basic, symbol: e.target.value }
                }))}
              />
            </div>
            
            <div className="space-y-2">
              <label>Side</label>
              <Select
                value={orderDetails.basic.side}
                onValueChange={(value: 'buy' | 'sell') => setOrderDetails(prev => ({
                  ...prev,
                  basic: { ...prev.basic, side: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label>Quantity</label>
              <Input
                type="number"
                value={orderDetails.basic.quantity}
                onChange={(e) => setOrderDetails(prev => ({
                  ...prev,
                  basic: { ...prev.basic, quantity: Number(e.target.value) }
                }))}
              />
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-2">
              <label>Time in Force</label>
              <Select
                value={orderDetails.advanced.timeInForce}
                onValueChange={(value: 'day' | 'gtc' | 'ioc' | 'fok') => setOrderDetails(prev => ({
                  ...prev,
                  advanced: { ...prev.advanced, timeInForce: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="gtc">GTC</SelectItem>
                  <SelectItem value="ioc">IOC</SelectItem>
                  <SelectItem value="fok">FOK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={orderDetails.advanced.allowOutsideRth}
                onCheckedChange={(checked) => setOrderDetails(prev => ({
                  ...prev,
                  advanced: { ...prev.advanced, allowOutsideRth: checked }
                }))}
              />
              <label>Allow Outside Regular Trading Hours</label>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            <div className="space-y-2">
              <label>Take Profit Price</label>
              <Input
                type="number"
                value={orderDetails.riskManagement.takeProfit?.price || ''}
                onChange={(e) => setOrderDetails(prev => ({
                  ...prev,
                  riskManagement: {
                    ...prev.riskManagement,
                    takeProfit: {
                      ...prev.riskManagement.takeProfit,
                      price: Number(e.target.value),
                      type: 'limit'
                    }
                  }
                }))}
              />
            </div>

            <div className="space-y-2">
              <label>Stop Loss Price</label>
              <Input
                type="number"
                value={orderDetails.riskManagement.stopLoss?.price || ''}
                onChange={(e) => setOrderDetails(prev => ({
                  ...prev,
                  riskManagement: {
                    ...prev.riskManagement,
                    stopLoss: {
                      ...prev.riskManagement.stopLoss,
                      price: Number(e.target.value),
                      type: 'stop'
                    }
                  }
                }))}
              />
            </div>
          </TabsContent>
        </Tabs>

        <Button 
          onClick={handleSubmitOrder} 
          className="w-full mt-6"
        >
          Submit Order
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdvancedOrderEntry;