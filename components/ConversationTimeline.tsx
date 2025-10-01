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
    <div className="space-y-4">
      {transitions.map((transition) => (
        <Card key={transition.id} className="p-4">
          <div className="flex items-start gap-4">
            {/* Sequence Number */}
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
              {transition.sequence_number}
            </div>

            <div className="flex-1">
              {/* State Transition */}
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{transition.from_state || 'START'}</Badge>
                <span>→</span>
                <Badge variant="outline">{transition.to_state}</Badge>
                <Badge variant="secondary">{transition.transition_type}</Badge>
              </div>

              {/* User Input */}
              <div className="mb-2">
                <p className="text-sm font-semibold text-gray-600">User:</p>
                <p className="text-sm bg-blue-50 p-2 rounded">{transition.user_input}</p>
              </div>

              {/* Agent Response */}
              <div className="mb-2">
                <p className="text-sm font-semibold text-gray-600">Agent:</p>
                <p className="text-sm bg-green-50 p-2 rounded">{transition.agent_response}</p>
              </div>

              {/* Context Updates */}
              {transition.context_updates && Object.keys(transition.context_updates).length > 0 && (
                <div className="mb-2">
                  <p className="text-sm font-semibold text-gray-600">Context Updated:</p>
                  <div className="flex flex-wrap gap-1">
                    {Object.keys(transition.context_updates).map(key => (
                      <Badge key={key} variant="secondary" className="text-xs">
                        {key}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="flex gap-4 text-xs text-gray-500 mt-2">
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
