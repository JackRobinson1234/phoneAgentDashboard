'use client'

import { useEffect, useState } from 'react'
import { getCalls } from '@/lib/queries'
import { Call } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Session ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>States</TableHead>
          <TableHead>Tokens</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {calls.map((call) => (
          <TableRow key={call.call_id}>
            <TableCell className="font-mono text-sm">
              {call.session_id.substring(0, 8)}...
            </TableCell>
            <TableCell>
              <Badge variant={
                call.completion_status === 'completed' ? 'success' :
                call.completion_status === 'error' ? 'destructive' :
                'secondary'
              }>
                {call.completion_status}
              </Badge>
            </TableCell>
            <TableCell>{call.duration_seconds}s</TableCell>
            <TableCell>{call.total_states_visited}</TableCell>
            <TableCell>{call.total_tokens_used?.toLocaleString()}</TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(call.start_time), { addSuffix: true })}
            </TableCell>
            <TableCell>
              <Link 
                href={`/calls/${call.call_id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
