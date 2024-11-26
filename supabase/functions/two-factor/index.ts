import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as speakeasy from 'https://esm.sh/speakeasy@2.0.0'
import * as qrcode from 'https://esm.sh/qrcode@1.5.3'

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
    const { action, userId, token } = await req.json()

    if (action === 'setup') {
      const secret = speakeasy.generateSecret({
        name: `OPTION-PAiY:${userId}`
      })

      // Store the secret in the user's profile
      await supabase
        .from('Profile')
        .update({ 
          twoFactorSecret: secret.base32,
          twoFactorEnabled: false 
        })
        .eq('userId', userId)

      const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url)

      return new Response(
        JSON.stringify({ secret: secret.base32, qrCode: qrCodeUrl }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } 
    
    if (action === 'verify') {
      // Get user's secret from profile
      const { data: profile } = await supabase
        .from('Profile')
        .select('twoFactorSecret')
        .eq('userId', userId)
        .single()

      if (!profile?.twoFactorSecret) {
        throw new Error('2FA not set up for this user')
      }

      const verified = speakeasy.totp.verify({
        secret: profile.twoFactorSecret,
        encoding: 'base32',
        token
      })

      if (verified) {
        await supabase
          .from('Profile')
          .update({ twoFactorEnabled: true })
          .eq('userId', userId)
      }

      return new Response(
        JSON.stringify({ verified }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    throw new Error('Invalid action')
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