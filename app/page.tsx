'use client'

import { Suspense, useState } from 'react'
import dynamic from 'next/dynamic'
import { CallsList } from '@/components/CallsList'
import { ChevronDown, ChevronUp } from 'lucide-react'

const CommonFlowsChart = dynamic(
  () => import('@/components/CommonFlowsChart').then(mod => ({ default: mod.CommonFlowsChart })),
  { ssr: false, loading: () => <div className="text-center py-4">Loading flow chart...</div> }
)

export default function Home() {
  const [showFlowChart, setShowFlowChart] = useState(false)

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Phone Agent Dashboard</h1>
        <button
          onClick={() => setShowFlowChart(!showFlowChart)}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          {showFlowChart ? 'Hide' : 'Show'} Flow Chart
          {showFlowChart ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {showFlowChart && (
        <div className="mb-8">
          <CommonFlowsChart />
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Recent Calls</h2>
      <Suspense fallback={<div className="text-center py-8">Loading calls...</div>}>
        <CallsList />
      </Suspense>
    </div>
  )
}
