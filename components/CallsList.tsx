'use client'

import { useEffect, useState } from 'react'
import { getCalls } from '@/lib/queries'
import { Call } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { format } from 'date-fns'
import Link from 'next/link'
import { Phone, Clock, Target } from 'lucide-react'

export function CallsList() {
  const [calls, setCalls] = useState<Call[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCalls() {
      try {
        const data = await getCalls(50)
        setCalls(data)
      } catch (error) {
        console.error('Error loading calls:', error)
      } finally {
        setLoading(false)
      }
    }
    loadCalls()
  }, [])

  if (loading) return <div className="text-center py-8">Loading calls...</div>

  if (calls.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No calls found</div>
  }

  return (
    <div className="flex flex-col gap-4">
      {calls.map((call) => {
        // Extract detected_intent from context_snapshot if available
        const detectedIntent = call.context_snapshot?.detected_intent || 'Not detected'
        
        // Extract key context fields for bubbles (excluding detected_intent as it's already shown)
        const contextBubbles = call.context_snapshot 
          ? Object.entries(call.context_snapshot)
              .filter(([key]) => key !== 'detected_intent')
              .slice(0, 5) // Limit to 5 bubbles
          : []
        
        return (
          <Link key={call.call_id} href={`/calls/${call.call_id}`}>
            <Card className="rounded-2xl hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Phone Number */}
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 bg-blue-100 rounded-xl">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone Number</p>
                        <p className="text-lg font-semibold">
                          {call.user_phone || 'Unknown'}
                        </p>
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 bg-green-100 rounded-xl">
                        <Clock className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="text-lg font-semibold">
                          {format(new Date(call.start_time), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                    </div>

                    {/* Detected Intent */}
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 bg-purple-100 rounded-xl">
                        <Target className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Intent</p>
                        <p className="text-lg font-semibold capitalize">
                          {detectedIntent}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Context Summary Bubbles */}
                  {contextBubbles.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t">
                      {contextBubbles.map(([key, value]) => (
                        <div 
                          key={key} 
                          className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-3 py-1"
                        >
                          <span className="text-xs font-semibold text-blue-700">{key}:</span>
                          <span className="text-xs text-blue-900 ml-1">
                            {typeof value === 'object' 
                              ? JSON.stringify(value).substring(0, 30) + (JSON.stringify(value).length > 30 ? '...' : '')
                              : String(value).substring(0, 30) + (String(value).length > 30 ? '...' : '')
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
