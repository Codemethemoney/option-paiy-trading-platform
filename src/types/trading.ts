export interface OrderEntry {
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
    minQuantity?: number;
    displayQuantity?: number;
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
  };
}

export interface ExecutionResult {
  orderId: string;
  status: 'filled' | 'partial' | 'pending' | 'rejected';
  filledQuantity: number;
  averagePrice: number;
  timestamp: Date;
}