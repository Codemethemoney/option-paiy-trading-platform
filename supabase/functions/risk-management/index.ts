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
    const { userId, positions } = await req.json()

    // Calculate portfolio risk metrics
    const riskMetrics = await calculatePortfolioRisk(positions)

    // Store risk metrics
    await supabase
      .from('RiskMetric')
      .insert({
        userId,
        ...riskMetrics,
        timestamp: new Date().toISOString()
      })

    // Check for risk threshold breaches
    const riskAlerts = checkRiskThresholds(riskMetrics)

    return new Response(
      JSON.stringify({ riskMetrics, alerts: riskAlerts }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in risk management:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

async function calculatePortfolioRisk(positions: any[]) {
  const totalValue = positions.reduce((sum, pos) => sum + pos.value, 0)
  const weights = positions.map(pos => pos.value / totalValue)
  
  // Calculate portfolio metrics
  return {
    portfolioValue: totalValue,
    valueAtRisk: calculateVaR(positions, weights),
    sharpeRatio: calculateSharpeRatio(positions, weights),
    delta: calculateDelta(positions),
    gamma: calculateGamma(positions),
    theta: calculateTheta(positions),
    vega: calculateVega(positions),
    rho: calculateRho(positions)
  }
}

function calculateVaR(positions: any[], weights: number[]) {
  // Implement Value at Risk calculation
  return positions.reduce((var_, pos, i) => 
    var_ + pos.stdDev * weights[i], 0) * 1.96
}

function calculateSharpeRatio(positions: any[], weights: number[]) {
  const riskFreeRate = 0.02 // 2% annual risk-free rate
  const expectedReturn = positions.reduce((er, pos, i) => 
    er + pos.expectedReturn * weights[i], 0)
  const portfolioStdDev = calculatePortfolioStdDev(positions, weights)
  
  return (expectedReturn - riskFreeRate) / portfolioStdDev
}

function calculatePortfolioStdDev(positions: any[], weights: number[]) {
  // Simple portfolio standard deviation calculation
  return Math.sqrt(positions.reduce((variance, pos, i) => 
    variance + Math.pow(pos.stdDev * weights[i], 2), 0))
}

// Option Greeks calculations
function calculateDelta(positions: any[]) {
  return positions.reduce((delta, pos) => delta + (pos.delta || 0), 0)
}

function calculateGamma(positions: any[]) {
  return positions.reduce((gamma, pos) => gamma + (pos.gamma || 0), 0)
}

function calculateTheta(positions: any[]) {
  return positions.reduce((theta, pos) => theta + (pos.theta || 0), 0)
}

function calculateVega(positions: any[]) {
  return positions.reduce((vega, pos) => vega + (pos.vega || 0), 0)
}

function calculateRho(positions: any[]) {
  return positions.reduce((rho, pos) => rho + (pos.rho || 0), 0)
}

function checkRiskThresholds(metrics: any) {
  const alerts = []
  
  // VaR threshold
  if (metrics.valueAtRisk > metrics.portfolioValue * 0.1) {
    alerts.push({
      level: 'HIGH',
      message: 'Value at Risk exceeds 10% of portfolio value'
    })
  }
  
  // Delta threshold
  if (Math.abs(metrics.delta) > 100) {
    alerts.push({
      level: 'MEDIUM',
      message: 'Portfolio delta exposure exceeds threshold'
    })
  }
  
  return alerts
}