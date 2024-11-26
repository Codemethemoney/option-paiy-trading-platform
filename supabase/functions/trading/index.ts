import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import ccxt from 'https://esm.sh/ccxt@4.1.43'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { exchangeName, symbol, type, side, amount, price, userId } = await req.json()

    // Initialize exchange
    const exchange = new ccxt[exchangeName]({
      apiKey: Deno.env.get(`${exchangeName.toUpperCase()}_API_KEY`),
      secret: Deno.env.get(`${exchangeName.toUpperCase()}_SECRET_KEY`),
      enableRateLimit: true
    })

    // Execute order
    const order = await exchange.createOrder(
      symbol,
      type,
      side,
      amount,
      price
    )

    // Store order in database
    await supabase
      .from('Transaction')
      .insert({
        userId,
        type: 'TRADE',
        amount,
        currency: symbol.split('/')[1],
        status: 'PENDING',
        description: `${side} ${amount} ${symbol} @ ${price}`
      })

    return new Response(
      JSON.stringify(order),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})