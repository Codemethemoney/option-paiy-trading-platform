import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { type, symbol } = await req.json()
    
    if (type === 'market-intelligence') {
      // Mock market intelligence data
      const mockData = {
        regime: {
          current: 'Bullish',
          probability: 75
        },
        sentiment: {
          overall: 'Positive',
          trend: 'Upward'
        }
      }
      return new Response(
        JSON.stringify(mockData),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else if (symbol) {
      // Mock market price data for a specific symbol
      const mockPriceData = Array.from({ length: 30 }, (_, i) => ({
        timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
        price: 50000 + Math.random() * 1000 - 500,
        volume: Math.floor(Math.random() * 1000)
      }))
      return new Response(
        JSON.stringify(mockPriceData),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    throw new Error('Invalid request parameters')
  } catch (error) {
    console.error('Error in market-data function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})