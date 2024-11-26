import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseKey)

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

    if (!payload || typeof payload !== 'object') {
      throw new Error('Invalid payload format')
    }

    let response
    switch (action) {
      case 'submit':
        response = await handleOrderSubmission(payload)
        break
      case 'modify':
        response = await handleOrderModification(payload)
        break
      case 'cancel':
        response = await handleOrderCancellation(payload)
        break
      case 'strategy':
        response = await handleStrategyExecution(payload)
        break
      case 'positions':
        response = await handlePositionManagement(payload)
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
    console.error('Error in trading-v2 function:', error)
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

async function handleOrderSubmission(payload: any) {
  const { order } = payload
  console.log('Processing order submission:', order)
  
  try {
    // Store order in database
    const { data, error } = await supabase
      .from('Transaction')
      .insert({
        userId: order.userId,
        type: 'TRADE',
        amount: order.quantity,
        currency: order.symbol.split('/')[1] || 'USD',
        status: 'PENDING',
        description: `${order.side} ${order.quantity} ${order.symbol}`
      })
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error submitting order:', error)
    throw error
  }
}

async function handleOrderModification(payload: any) {
  const { orderId, updates } = payload
  console.log('Processing order modification:', orderId, updates)
  
  try {
    const { data, error } = await supabase
      .from('Transaction')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error modifying order:', error)
    throw error
  }
}

async function handleOrderCancellation(payload: any) {
  const { orderId } = payload
  console.log('Processing order cancellation:', orderId)
  
  try {
    const { data, error } = await supabase
      .from('Transaction')
      .update({ status: 'CANCELLED' })
      .eq('id', orderId)
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error cancelling order:', error)
    throw error
  }
}

async function handleStrategyExecution(payload: any) {
  console.log('Processing strategy execution:', payload)
  const response = {
    strategyId: crypto.randomUUID(),
    status: 'ACTIVE',
    positions: [],
    performance: {
      pnl: 0,
      drawdown: 0,
      sharpeRatio: 0
    }
  }

  return new Response(
    JSON.stringify(response),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function handlePositionManagement(payload: any) {
  console.log('Processing position management:', payload)
  const response = {
    positions: [],
    exposure: {
      gross: 0,
      net: 0,
      delta: 0
    },
    risk: {
      var: 0,
      beta: 1,
      correlation: 0
    }
  }

  return new Response(
    JSON.stringify(response),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}