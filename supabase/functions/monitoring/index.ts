import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    // Get system metrics
    const metrics = {
      timestamp: new Date().toISOString(),
      memory: {
        total: Deno.systemMemoryInfo().total,
        free: Deno.systemMemoryInfo().free,
      },
      cpu: await Deno.loadavg(),
    }

    // Store metrics in SystemHealth table
    await supabase
      .from('SystemHealth')
      .insert({
        service: 'API',
        status: 'healthy',
        latency: 0,
        message: JSON.stringify(metrics)
      })

    return new Response(
      JSON.stringify({ status: 'success', metrics }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})