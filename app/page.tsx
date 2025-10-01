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
    <div className="container mx-auto py-4 md:py-8 px-3 md:px-4 max-w-7xl">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Phone Agent Dashboard</h1>
        <button
          onClick={() => setShowFlowChart(!showFlowChart)}
          className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm md:text-base"
        >
          {showFlowChart ? 'Hide' : 'Show'} Flow Chart
          {showFlowChart ? <ChevronUp className="w-3 h-3 md:w-4 md:h-4" /> : <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />}
        </button>
      </div>

      {showFlowChart && (
        <div className="mb-6 md:mb-8">
          <CommonFlowsChart />
        </div>
      )}

      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h2 className="text-xl md:text-2xl font-bold">Recent Calls</h2>
      </div>
      <Suspense fallback={<div className="text-center py-8">Loading calls...</div>}>
        <CallsList />
      </Suspense>
    </div>
  )
}
