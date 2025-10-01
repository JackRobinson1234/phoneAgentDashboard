'use client'

import { useEffect, useState } from 'react'
import { getCallsWithFinalContext } from '@/lib/queries'
import { Call } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { format } from 'date-fns'
import Link from 'next/link'
import { Clock, RefreshCw } from 'lucide-react'

type CallWithContext = Call & { finalContext: Record<string, any> | null }

export function CallsList() {
  const [calls, setCalls] = useState<CallWithContext[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadCalls = async () => {
    try {
      setRefreshing(true)
      const data = await getCallsWithFinalContext(50)
      setCalls(data)
    } catch (error) {
      console.error('Error loading calls:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadCalls()
  }, [])

  if (loading) return <div className="text-center py-8">Loading calls...</div>

  return (
    <>
      <div className="flex justify-end mb-3">
        <button
          onClick={loadCalls}
          disabled={refreshing}
          className="flex items-center gap-2 px-3 py-1.5 border-2 border-black hover:bg-gray-100 transition-colors disabled:opacity-50 text-sm font-semibold"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {calls.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No calls found</div>
      ) : (
        <div className="flex flex-col gap-3">
      {calls.map((call) => {
        // Extract final context fields
        const contextBubbles = call.finalContext 
          ? Object.entries(call.finalContext).slice(0, 4) // Show up to 4 context fields
          : []
        
        return (
          <Link key={call.call_id} href={`/calls/${call.call_id}`}>
            <Card className="border-2 border-black hover:bg-gray-50 transition-colors cursor-pointer">
              <CardContent className="p-0">
                <div className="flex items-center justify-between gap-6 px-6 py-4">
                  {/* Left: Timestamp */}
                  <div className="flex items-center gap-3 min-w-[250px]">
                    <Clock className="w-5 h-5 text-black flex-shrink-0" />
                    <p className="text-sm font-semibold">
                      {format(new Date(call.start_time), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>

                  {/* Right: Final Context */}
                  <div className="flex-1 flex items-center justify-end">
                    {contextBubbles.length > 0 ? (
                      <div className="flex flex-wrap gap-2 justify-end items-center">
                        {contextBubbles.map(([key, value]) => (
                          <div 
                            key={key} 
                            className="bg-white border border-black rounded-full px-3 py-1.5"
                          >
                            <span className="text-xs font-semibold">{key}:</span>
                            <span className="text-xs ml-1">
                              {typeof value === 'object' 
                                ? JSON.stringify(value).substring(0, 30) + (JSON.stringify(value).length > 30 ? '...' : '')
                                : String(value).substring(0, 30) + (String(value).length > 30 ? '...' : '')
                              }
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">No context</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
        </div>
      )}
    </>
  )
}
