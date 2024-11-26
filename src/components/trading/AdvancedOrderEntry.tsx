import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface OrderEntry {
  basic: {
    symbol: string;
    side: 'buy' | 'sell';
    type: 'market' | 'limit' | 'stop' | 'stop-limit';
    quantity: number;
    price?: number;
    stopPrice?: number;
  };
  advanced: {
    timeInForce: 'day' | 'gtc' | 'ioc' | 'fok';
    allowOutsideRth: boolean;
    discretionaryAmount?: number;
    minQuantity?: number;
    displayQuantity?: number;
    preventPostOnly?: boolean;
  };
  riskManagement: {
    takeProfit?: {
      price: number;
      type: 'limit' | 'market';
    };
    stopLoss?: {
      price: number;
      type: 'stop' | 'stop-limit' | 'trailing';
      trailingAmount?: number;
    };
    maxLoss?: number;
    positionSizing?: {
      riskPerTrade: number;
      maxPositionSize: number;
    }
  };
}

const AdvancedOrderEntry = () => {
  const { toast } = useToast();
  const [orderDetails, setOrderDetails] = useState<OrderEntry>({
    basic: {
      symbol: '',
      side: 'buy',
      type: 'market',
      quantity: 0,
    },
    advanced: {
      timeInForce: 'day',
      allowOutsideRth: false,
    },
    riskManagement: {}
  });

  // AI Trading Assistant Query
  const { data: aiAnalysis } = useQuery({
    queryKey: ['ai-analysis', orderDetails.basic.symbol],
    queryFn: async () => {
      const response = await supabase.functions.invoke('ai-trading-v2', {
        body: {
          action: 'price-prediction',
          payload: {
            symbol: orderDetails.basic.symbol,
            timeframe: '1h'
          }
        }
      });

      if (response.error) throw response.error;
      return response.data;
    },
    enabled: !!orderDetails.basic.symbol
  });

  const handleSubmitOrder = async () => {
    try {
      const response = await supabase.functions.invoke('trading-v2', {
        body: {
          action: 'submit',
          payload: {
            order: {
              ...orderDetails.basic,
              userId: (await supabase.auth.getUser()).data.user?.id
            }
          }
        }
      });

      if (response.error) throw response.error;

      toast({
        title: "Order Submitted",
        description: "Your order has been successfully submitted.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit order. Please try again.",
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
              {aiAnalysis && (
                <div className="text-sm text-muted-foreground">
                  AI Prediction: {aiAnalysis.prediction}
                </div>
              )}
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
              <label>Type</label>
              <Select
                value={orderDetails.basic.type}
                onValueChange={(value: 'market' | 'limit' | 'stop' | 'stop-limit') => setOrderDetails(prev => ({
                  ...prev,
                  basic: { ...prev.basic, type: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Market</SelectItem>
                  <SelectItem value="limit">Limit</SelectItem>
                  <SelectItem value="stop">Stop</SelectItem>
                  <SelectItem value="stop-limit">Stop Limit</SelectItem>
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