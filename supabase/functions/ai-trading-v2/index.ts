import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const openAIApiKey = Deno.env.get('OPENAI_API_KEY')

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204,
      headers: corsHeaders 
    })
  }

  try {
    console.log('Received request:', req.method)
    const { action, payload } = await req.json()
    console.log('Action:', action, 'Payload:', payload)

    let response
    switch (action) {
      case 'price-prediction':
        response = await handlePricePrediction(payload)
        break
      case 'strategy-optimization':
        response = await handleStrategyOptimization(payload)
        break
      case 'risk-analysis':
        response = await handleRiskAnalysis(payload)
        break
      case 'sentiment':
        response = await handleMarketSentiment(payload)
        break
      default:
        throw new Error('Invalid action')
    }

    return new Response(
      JSON.stringify(response),
      { 
        status: 200,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        } 
      }
    )
  } catch (error) {
    console.error('Error in ai-trading-v2 function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        details: error.toString()
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        } 
      }
    )
  }
})

async function handlePricePrediction(payload: any) {
  const { symbol, timeframe } = payload
  console.log('Processing price prediction for:', symbol, timeframe)

  try {
    // Use GPT-4 for price prediction
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
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

    if (!response.ok) {
      throw new Error('Failed to get AI prediction')
    }

    const aiResponse = await response.json()
    const prediction = aiResponse.choices[0].message.content

    return new Response(
      JSON.stringify({ prediction }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in price prediction:', error)
    throw error
  }
}

async function handleStrategyOptimization(payload: any) {
  console.log('Processing strategy optimization:', payload)
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
  console.log('Processing risk analysis:', payload)
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
  console.log('Processing market sentiment for:', symbol, sources)

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a market sentiment analyzer.'
          },
          {
            role: 'user',
            content: `Analyze the market sentiment for ${symbol} considering ${sources?.join(', ') || 'all available sources'}.`
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error('Failed to get sentiment analysis')
    }

    const aiResponse = await response.json()
    const sentiment = aiResponse.choices[0].message.content

    return new Response(
      JSON.stringify({ sentiment }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in sentiment analysis:', error)
    throw error
  }
}