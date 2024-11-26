import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const openAIApiKey = Deno.env.get('OPENAI_API_KEY')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, payload } = await req.json()

    switch (action) {
      case 'price-prediction':
        return handlePricePrediction(payload)
      case 'strategy-optimization':
        return handleStrategyOptimization(payload)
      case 'risk-analysis':
        return handleRiskAnalysis(payload)
      case 'sentiment':
        return handleMarketSentiment(payload)
      default:
        throw new Error('Invalid action')
    }
  } catch (error) {
    console.error('Error in ai-trading-v2 function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

async function handlePricePrediction(payload: any) {
  const { symbol, timeframe } = payload

  // Use GPT-4 for price prediction
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a financial analyst specialized in price prediction.'
        },
        {
          role: 'user',
          content: `Analyze the price movement for ${symbol} in the ${timeframe} timeframe and provide a prediction.`
        }
      ]
    })
  })

  const aiResponse = await response.json()
  const prediction = aiResponse.choices[0].message.content

  return new Response(
    JSON.stringify({ prediction }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function handleStrategyOptimization(payload: any) {
  // Mock strategy optimization response
  const response = {
    optimizedParameters: {
      entryThreshold: 0.5,
      exitThreshold: -0.3,
      stopLoss: 0.02,
      positionSize: 0.1
    },
    expectedPerformance: {
      sharpeRatio: 1.5,
      sortino: 2.0,
      maxDrawdown: 0.15
    },
    robustness: 0.85
  }

  return new Response(
    JSON.stringify(response),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function handleRiskAnalysis(payload: any) {
  // Mock risk analysis response
  const response = {
    riskScore: 0.65,
    factors: {
      market: 0.4,
      volatility: 0.3,
      liquidity: 0.2,
      correlation: 0.1
    },
    recommendations: [
      'Consider reducing position size',
      'Implement tighter stop-loss'
    ]
  }

  return new Response(
    JSON.stringify(response),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function handleMarketSentiment(payload: any) {
  const { symbol, sources } = payload

  // Use GPT-4 for sentiment analysis
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a market sentiment analyzer.'
        },
        {
          role: 'user',
          content: `Analyze the market sentiment for ${symbol} considering ${sources.join(', ')}.`
        }
      ]
    })
  })

  const aiResponse = await response.json()
  const sentiment = aiResponse.choices[0].message.content

  return new Response(
    JSON.stringify({ sentiment }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}