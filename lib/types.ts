export interface Call {
  call_id: string
  session_id: string
  start_time: string
  end_time: string | null
  duration_seconds: number | null
  user_phone: string | null
  initial_state: string
  final_state: string | null
  completion_status: 'completed' | 'error' | 'abandoned' | 'in_progress'
  total_states_visited: number
  total_llm_calls: number
  total_tokens_used: number
  context_snapshot?: Record<string, any>
  created_at: string
}

export interface StateTransition {
  id: number
  call_id: string
  timestamp: string
  sequence_number: number
  from_state: string | null
  to_state: string
  transition_type: 'optimized' | 'fallback' | 'continue' | 'error'
  user_input: string
  agent_response: string
  context_snapshot: Record<string, any>
  context_updates: Record<string, any>
  llm_model: string | null
  llm_tokens_used: number | null
  processing_time_ms: number | null
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      calls: {
        Row: Call
        Insert: Omit<Call, 'created_at'>
        Update: Partial<Call>
      }
      state_transitions: {
        Row: StateTransition
        Insert: Omit<StateTransition, 'id' | 'created_at'>
        Update: Partial<StateTransition>
      }
    }
  }
}
