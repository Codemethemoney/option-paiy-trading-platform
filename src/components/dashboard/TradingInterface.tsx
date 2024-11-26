import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TradingInterface = () => {
  const [orderDetails, setOrderDetails] = useState({
    symbol: '',
    type: 'market',
    side: 'buy',
    quantity: 0,
    price: 0
  });

  const handleTrade = async () => {
    const response = await fetch('/api/functions/v1/trading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails)
    });
    
    if (!response.ok) {
      throw new Error('Trade execution failed');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade Execution</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <label>Symbol</label>
            <Input
              value={orderDetails.symbol}
              onChange={(e) => setOrderDetails({ ...orderDetails, symbol: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label>Order Type</label>
            <Select
              value={orderDetails.type}
              onValueChange={(value) => setOrderDetails({ ...orderDetails, type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="market">Market</SelectItem>
                <SelectItem value="limit">Limit</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label>Quantity</label>
            <Input
              type="number"
              value={orderDetails.quantity}
              onChange={(e) => setOrderDetails({ ...orderDetails, quantity: Number(e.target.value) })}
            />
          </div>
          
          <Button onClick={handleTrade} className="w-full">
            Execute Trade
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TradingInterface;