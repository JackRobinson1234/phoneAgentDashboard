import { Suspense } from 'react'
import { CallsList } from '@/components/CallsList'

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8">Recent Calls</h1>

      <Suspense fallback={<div className="text-center py-8">Loading calls...</div>}>
        <CallsList />
      </Suspense>
    </div>
  )
}
