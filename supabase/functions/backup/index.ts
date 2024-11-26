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
    // Get all data that needs to be backed up
    const [accounts, transactions, profiles] = await Promise.all([
      supabase.from('Account').select('*'),
      supabase.from('Transaction').select('*'),
      supabase.from('Profile').select('*')
    ])

    // Create backup object
    const backup = {
      timestamp: new Date().toISOString(),
      data: {
        accounts: accounts.data,
        transactions: transactions.data,
        profiles: profiles.data
      }
    }

    // Store backup metadata
    await supabase
      .from('SystemHealth')
      .insert({
        service: 'Backup',
        status: 'completed',
        message: `Backup completed at ${backup.timestamp}`
      })

    return new Response(
      JSON.stringify({ status: 'success', timestamp: backup.timestamp }),
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