import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { CallsList } from '@/components/CallsList'

const CommonFlowsChart = dynamic(
  () => import('@/components/CommonFlowsChart').then(mod => ({ default: mod.CommonFlowsChart })),
  { ssr: false, loading: () => <div className="mb-8 text-center py-8">Loading flow chart...</div> }
)

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8">Phone Agent Dashboard</h1>

      <CommonFlowsChart />

      <h2 className="text-2xl font-bold mb-4">Recent Calls</h2>
      <Suspense fallback={<div className="text-center py-8">Loading calls...</div>}>
        <CallsList />
      </Suspense>
    </div>
  )
}
