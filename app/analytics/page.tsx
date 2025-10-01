import { AnalyticsCharts } from '@/components/AnalyticsCharts'
import { Suspense } from 'react'

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Analytics</h1>
      
      <Suspense fallback={<div>Loading analytics...</div>}>
        <AnalyticsCharts />
      </Suspense>
    </div>
  )
}
