'use client'

import { Call, StateTransition } from '@/lib/types'
import { MermaidFlowChart } from './MermaidFlowChart'
import { ConversationTimeline } from './ConversationTimeline'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { generateMermaidDiagram } from '@/lib/queries'

interface Props {
  call: Call
  transitions: StateTransition[]
}

export function CallDetail({ call, transitions }: Props) {
  const mermaidDiagram = generateMermaidDiagram(transitions)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Call Details</h1>

      {/* Call Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={
              call.completion_status === 'completed' ? 'success' :
              call.completion_status === 'error' ? 'destructive' :
              'secondary'
            }>
              {call.completion_status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{call.duration_seconds}s</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">LLM Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{call.total_llm_calls}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Tokens Used</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{call.total_tokens_used?.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Flow Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Conversation Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <MermaidFlowChart diagram={mermaidDiagram} />
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ConversationTimeline transitions={transitions} />
        </CardContent>
      </Card>
    </div>
  )
}
