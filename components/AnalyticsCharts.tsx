'use client'

import { useEffect, useState } from 'react'
import { getAnalytics, getStateTransitionStats } from '@/lib/queries'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

export function AnalyticsCharts() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [transitions, setTransitions] = useState<any>(null)

  useEffect(() => {
    async function loadData() {
      const [analyticsData, transitionsData] = await Promise.all([
        getAnalytics(7),
        getStateTransitionStats()
      ])
      setAnalytics(analyticsData)
      setTransitions(transitionsData)
    }
    loadData()
  }, [])

  if (!analytics || !transitions) return <div>Loading...</div>

  // Prepare data for charts
  const transitionData = Object.entries(transitions)
    .map(([key, value]: [string, any]) => ({
      name: key,
      count: value.count,
      avgTime: Math.round(value.avgTime)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{analytics.totalCalls}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{analytics.completionRate.toFixed(1)}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Avg Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{Math.round(analytics.avgDuration)}s</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{analytics.totalTokens.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Top State Transitions */}
      <Card>
        <CardHeader>
          <CardTitle>Top State Transitions</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={transitionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Frequency" />
              <Bar dataKey="avgTime" fill="#82ca9d" name="Avg Time (ms)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Calls Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Calls Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.calls.map((c: any) => ({
              time: new Date(c.start_time).toLocaleDateString(),
              duration: c.duration_seconds
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="duration" stroke="#8884d8" name="Duration (s)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
