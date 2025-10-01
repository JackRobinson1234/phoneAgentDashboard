import { Suspense } from 'react'
import { CallsList } from '@/components/CallsList'
import { StatsCards } from '@/components/StatsCards'
import { Filters } from '@/components/Filters'

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Call Analytics Dashboard</h1>
      
      <Suspense fallback={<div>Loading stats...</div>}>
        <StatsCards />
      </Suspense>

      <div className="mt-8">
        <Filters />
      </div>

      <div className="mt-8">
        <Suspense fallback={<div>Loading calls...</div>}>
          <CallsList />
        </Suspense>
      </div>
    </div>
  )
}
