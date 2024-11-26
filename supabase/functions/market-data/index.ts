import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { type } = await req.json()
    
    // Mock market intelligence data for now
    const mockData = {
      regime: {
        current: 'Bullish',
        probability: 75,
        indicators: {
          volatility: 0.15,
          momentum: 0.8,
          sentiment: 0.6
        }
      },
      sentiment: {
        overall: 0.7,
        trend: 'Positive',
        components: {
          technical: 0.8,
          fundamental: 0.6,
          news: 0.7
        }
      }
    }

    return new Response(
      JSON.stringify(mockData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
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