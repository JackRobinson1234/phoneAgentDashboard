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
        <Card key={transition.id} className="border-2 border-black p-3 md:p-4">
          <div className="flex items-start gap-2 md:gap-4">
            {/* Sequence Number */}
            <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-xs md:text-sm">
              {transition.sequence_number}
            </div>

            <div className="flex-1 min-w-0">
              {/* State Transition */}
              <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3 flex-wrap">
                <span className="px-1.5 md:px-2 py-0.5 md:py-1 border-2 border-black text-[10px] md:text-xs font-semibold">
                  {transition.from_state || 'START'}
                </span>
                <span className="font-bold text-xs md:text-base">→</span>
                <span className="px-1.5 md:px-2 py-0.5 md:py-1 border-2 border-black text-[10px] md:text-xs font-semibold">
                  {transition.to_state}
                </span>
              </div>

              {/* User Input */}
              <div className="mb-2 md:mb-3">
                <p className="text-[10px] md:text-xs font-bold mb-1">User:</p>
                <p className="text-xs md:text-sm bg-gray-100 border border-gray-300 p-2 md:p-3 rounded break-words">{transition.user_input}</p>
              </div>

              {/* Agent Response */}
              <div className="mb-2 md:mb-3">
                <p className="text-[10px] md:text-xs font-bold mb-1">Agent:</p>
                <p className="text-xs md:text-sm bg-white border border-gray-300 p-2 md:p-3 rounded break-words">{transition.agent_response}</p>
              </div>

              {/* Context Updates */}
              {transition.context_updates && Object.keys(transition.context_updates).length > 0 && (
                <div className="mb-2 md:mb-3">
                  <p className="text-[10px] md:text-xs font-bold mb-1">Context Updated:</p>
                  <div className="flex flex-wrap gap-1 md:gap-2 mt-1">
                    {Object.entries(transition.context_updates).map(([key, value]) => (
                      <div key={key} className="bg-white border border-black rounded-full px-2 md:px-3 py-0.5 md:py-1">
                        <span className="text-[10px] md:text-xs font-semibold">{key}:</span>
                        <span className="text-[10px] md:text-xs ml-1 break-all">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="flex flex-wrap gap-2 md:gap-4 text-[10px] md:text-xs text-gray-600 mt-2 pt-2 border-t border-gray-300">
                <span className="whitespace-nowrap">Model: {transition.llm_model}</span>
                <span className="whitespace-nowrap">Tokens: {transition.llm_tokens_used}</span>
                <span className="whitespace-nowrap">Time: {transition.processing_time_ms}ms</span>
                <span className="whitespace-nowrap">{format(new Date(transition.timestamp), 'HH:mm:ss')}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
