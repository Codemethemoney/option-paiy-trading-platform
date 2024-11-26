import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Configuration, OpenAIApi } from "https://esm.sh/openai@4.17.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseKey)

const openai = new OpenAIApi(new Configuration({
  apiKey: Deno.env.get('OPENAI_API_KEY')
}))

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { symbol, timeframe } = await req.json()

    // Get market data
    const marketData = await supabase
      .from('MarketData')
      .select('*')
      .eq('symbol', symbol)
      .order('timestamp', { ascending: false })
      .limit(100)

    // Analyze sentiment using OpenAI
    const sentimentResponse = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [{
        role: "system",
        content: "You are a financial analyst. Analyze the market data and provide trading signals."
      }, {
        role: "user",
        content: `Analyze this market data for ${symbol}: ${JSON.stringify(marketData)}`
      }]
    })

    const analysis = {
      timestamp: new Date().toISOString(),
      symbol,
      sentiment: sentimentResponse.data.choices[0].message?.content,
      signals: generateTradingSignals(marketData.data),
      riskScore: calculateRiskScore(marketData.data)
    }

    // Store analysis
    await supabase
      .from('TradingAnalysis')
      .insert(analysis)

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in AI trading analysis:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

function generateTradingSignals(data: any[]) {
  // Simple moving average crossover strategy
  const shortTermMA = calculateMA(data, 10)
  const longTermMA = calculateMA(data, 50)
  
  return {
    signal: shortTermMA > longTermMA ? 'BUY' : 'SELL',
    confidence: Math.abs(shortTermMA - longTermMA) / longTermMA
  }
}

function calculateMA(data: any[], period: number) {
  const prices = data.slice(0, period).map(d => d.price)
  return prices.reduce((a, b) => a + b, 0) / period
}

function calculateRiskScore(data: any[]) {
  const volatility = calculateVolatility(data)
  const volume = calculateAverageVolume(data)
  return (volatility * 0.7 + volume * 0.3)
}

function calculateVolatility(data: any[]) {
  const prices = data.map(d => d.price)
  const returns = prices.slice(1).map((price, i) => 
    (price - prices[i]) / prices[i]
  )
  return Math.sqrt(returns.reduce((a, b) => a + b * b, 0) / returns.length)
}

function calculateAverageVolume(data: any[]) {
  return data.reduce((sum, d) => sum + d.volume, 0) / data.length
}