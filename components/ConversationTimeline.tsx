'use client'

import { StateTransition } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

interface Props {
  transitions: StateTransition[]
}

export function ConversationTimeline({ transitions }: Props) {
  return (
    <div className="space-y-3">
      {transitions.map((transition) => (
        <Card key={transition.id} className="border-2 border-black p-4">
          <div className="flex items-start gap-4">
            {/* Sequence Number */}
            <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
              {transition.sequence_number}
            </div>

            <div className="flex-1">
              {/* State Transition */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 border-2 border-black text-xs font-semibold">
                  {transition.from_state || 'START'}
                </span>
                <span className="font-bold">→</span>
                <span className="px-2 py-1 border-2 border-black text-xs font-semibold">
                  {transition.to_state}
                </span>
              </div>

              {/* User Input */}
              <div className="mb-3">
                <p className="text-xs font-bold mb-1">User:</p>
                <p className="text-sm bg-gray-100 border border-gray-300 p-3 rounded">{transition.user_input}</p>
              </div>

              {/* Agent Response */}
              <div className="mb-3">
                <p className="text-xs font-bold mb-1">Agent:</p>
                <p className="text-sm bg-white border border-gray-300 p-3 rounded">{transition.agent_response}</p>
              </div>

              {/* Context Updates */}
              {transition.context_updates && Object.keys(transition.context_updates).length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-bold mb-1">Context Updated:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {Object.entries(transition.context_updates).map(([key, value]) => (
                      <div key={key} className="bg-white border border-black rounded-full px-3 py-1">
                        <span className="text-xs font-semibold">{key}:</span>
                        <span className="text-xs ml-1">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="flex gap-4 text-xs text-gray-600 mt-2 pt-2 border-t border-gray-300">
                <span>Model: {transition.llm_model}</span>
                <span>Tokens: {transition.llm_tokens_used}</span>
                <span>Time: {transition.processing_time_ms}ms</span>
                <span>{format(new Date(transition.timestamp), 'HH:mm:ss')}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
