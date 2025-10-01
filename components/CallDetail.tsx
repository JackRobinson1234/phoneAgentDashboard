'use client'

import dynamic from 'next/dynamic'
import { Call, StateTransition } from '@/lib/types'
import { ConversationTimeline } from './ConversationTimeline'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { generateMermaidDiagram } from '@/lib/queries'

const MermaidFlowChart = dynamic(
  () => import('./MermaidFlowChart').then(mod => ({ default: mod.MermaidFlowChart })),
  { ssr: false, loading: () => <div className="text-center py-4">Loading flow chart...</div> }
)

interface Props {
  call: Call
  transitions: StateTransition[]
}

export function CallDetail({ call, transitions }: Props) {
  const mermaidDiagram = generateMermaidDiagram(transitions)

  return (
    <div className="container mx-auto py-4 md:py-8 px-3 md:px-4 max-w-7xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Call Details</h1>

      {/* Flow Chart */}
      <Card className="mb-6 border-2 border-black">
        <CardHeader>
          <CardTitle>Conversation Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <MermaidFlowChart diagram={mermaidDiagram} />
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="border-2 border-black">
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
