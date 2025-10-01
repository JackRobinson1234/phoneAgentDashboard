'use client'

import { useEffect, useState } from 'react'
import { getCallsWithFinalContext } from '@/lib/queries'
import { Call } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { format } from 'date-fns'
import Link from 'next/link'
import { Clock } from 'lucide-react'

type CallWithContext = Call & { finalContext: Record<string, any> | null }

export function CallsList() {
  const [calls, setCalls] = useState<CallWithContext[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCalls() {
      try {
        const data = await getCallsWithFinalContext(50)
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
        // Extract final context fields
        const contextBubbles = call.finalContext 
          ? Object.entries(call.finalContext).slice(0, 8) // Show up to 8 context fields
          : []
        
        return (
          <Link key={call.call_id} href={`/calls/${call.call_id}`}>
            <Card className="rounded-2xl hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="py-8 px-6">
                <div className="space-y-4">
                  {/* Timestamp */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-xl">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Call Time</p>
                      <p className="text-lg font-semibold">
                        {format(new Date(call.start_time), 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                  </div>

                  {/* Final Context Bubbles */}
                  {contextBubbles.length > 0 ? (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Final Context</p>
                      <div className="flex flex-wrap gap-2">
                        {contextBubbles.map(([key, value]) => (
                          <div 
                            key={key} 
                            className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-4 py-2"
                          >
                            <span className="text-sm font-semibold text-blue-700">{key}:</span>
                            <span className="text-sm text-blue-900 ml-1">
                              {typeof value === 'object' 
                                ? JSON.stringify(value).substring(0, 40) + (JSON.stringify(value).length > 40 ? '...' : '')
                                : String(value).substring(0, 40) + (String(value).length > 40 ? '...' : '')
                              }
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No context available</p>
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
