import { supabase } from './supabase'
import { Call, StateTransition } from './types'

export async function getCalls(
  limit = 50,
  status?: string,
  startDate?: Date,
  endDate?: Date
) {
  let query = supabase
    .from('calls')
    .select('*')
    .order('start_time', { ascending: false })
    .limit(limit)

  if (status) {
    query = query.eq('completion_status', status)
  }

  if (startDate) {
    query = query.gte('start_time', startDate.toISOString())
  }

  if (endDate) {
    query = query.lte('start_time', endDate.toISOString())
  }

  const { data, error } = await query

  if (error) throw error
  return data as Call[]
}

export async function getCallById(callId: string) {
  const { data: call, error: callError } = await supabase
    .from('calls')
    .select('*')
    .eq('call_id', callId)
    .single()

  if (callError) throw callError

  const { data: transitions, error: transitionsError } = await supabase
    .from('state_transitions')
    .select('*')
    .eq('call_id', callId)
    .order('sequence_number', { ascending: true })

  if (transitionsError) throw transitionsError

  return {
    call: call as Call,
    transitions: transitions as StateTransition[]
  }
}

export async function getAnalytics(days = 7) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  // Get calls in date range
  const { data: calls, error } = await supabase
    .from('calls')
    .select('*')
    .gte('start_time', startDate.toISOString())

  if (error) throw error

  // Calculate metrics
  const totalCalls = calls.length
  const completedCalls = calls.filter(c => c.completion_status === 'completed').length
  const avgDuration = calls.reduce((sum, c) => sum + (c.duration_seconds || 0), 0) / totalCalls
  const totalTokens = calls.reduce((sum, c) => sum + (c.total_tokens_used || 0), 0)

  return {
    totalCalls,
    completedCalls,
    completionRate: totalCalls > 0 ? (completedCalls / totalCalls) * 100 : 0,
    avgDuration,
    totalTokens,
    calls
  }
}

export async function getStateTransitionStats() {
  const { data, error } = await supabase
    .from('state_transitions')
    .select('from_state, to_state, transition_type, processing_time_ms')

  if (error) throw error

  // Group by transition
  const transitions = data.reduce((acc, t) => {
    const key = `${t.from_state || 'START'} → ${t.to_state}`
    if (!acc[key]) {
      acc[key] = { count: 0, avgTime: 0, type: t.transition_type }
    }
    acc[key].count++
    acc[key].avgTime += t.processing_time_ms || 0
    return acc
  }, {} as Record<string, any>)

  // Calculate averages
  Object.keys(transitions).forEach(key => {
    transitions[key].avgTime /= transitions[key].count
  })

  return transitions
}

export function generateMermaidDiagram(transitions: StateTransition[]): string {
  let mermaid = 'graph TD\n'
  
  transitions.forEach(t => {
    const from = t.from_state || 'START'
    const to = t.to_state
    const updates = Object.keys(t.context_updates || {}).join(', ') || t.transition_type
    const label = updates.substring(0, 30) // Limit label length
    
    mermaid += `    ${from}-->|${label}|${to}\n`
  })
  
  return mermaid
}
