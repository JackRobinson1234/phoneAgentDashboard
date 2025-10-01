'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export function CommonFlowsChart() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'default',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
        padding: 8,
        nodeSpacing: 30,
        rankSpacing: 40
      },
      fontSize: 9
    })

    if (chartRef.current) {
      mermaid.contentLoaded()
    }
  }, [])

  const diagram = `
graph LR
    START[User Calls] --> GREETING[GREETING<br/>• Detect Intent]
    
    GREETING --> SURRENDER[PET_SURRENDER<br/>• Animal type<br/>• Reason<br/>• Health<br/>• Contact]
    GREETING --> EMERGENCY[EMERGENCY_CASE<br/>• Urgency<br/>• Location<br/>• Condition<br/>• Containment]
    GREETING --> FOUND[REPORT_FOUND<br/>• Description<br/>• Location<br/>• Finder info]
    GREETING --> LOST[REPORT_LOST<br/>• Description<br/>• Last seen<br/>• Microchip]
    
    SURRENDER --> SCHEDULE[SCHEDULE<br/>• Date/Time]
    SCHEDULE --> CONFIRM1[CONFIRM<br/>• Review]
    
    EMERGENCY --> CONFIRM2[CONFIRM<br/>• Verify]
    FOUND --> CONFIRM3[CONFIRM<br/>• Check DB]
    LOST --> CONFIRM4[CONFIRM<br/>• Check DB]
    
    CONFIRM1 --> COMPLETE1[COMPLETE<br/>• Case #<br/>• Appt details]
    CONFIRM2 --> COMPLETE2[COMPLETE<br/>• Dispatch<br/>• Hotline]
    CONFIRM3 --> COMPLETE3[COMPLETE<br/>• Drop-off<br/>• Hold info]
    CONFIRM4 --> COMPLETE4[COMPLETE<br/>• Search tips<br/>• Shelter info]
    
    COMPLETE1 --> END[End]
    COMPLETE2 --> END
    COMPLETE3 --> END
    COMPLETE4 --> END
    
    style START fill:#e3f2fd
    style GREETING fill:#fff3e0
    style SURRENDER fill:#f3e5f5
    style EMERGENCY fill:#ffebee
    style FOUND fill:#e8f5e9
    style LOST fill:#fff9c4
    style SCHEDULE fill:#f3e5f5
    style CONFIRM1 fill:#e1f5fe
    style CONFIRM2 fill:#e1f5fe
    style CONFIRM3 fill:#e1f5fe
    style CONFIRM4 fill:#e1f5fe
    style COMPLETE1 fill:#c8e6c9
    style COMPLETE2 fill:#c8e6c9
    style COMPLETE3 fill:#c8e6c9
    style COMPLETE4 fill:#c8e6c9
    style END fill:#e0e0e0
  `

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Common Call Flows</CardTitle>
        <p className="text-sm text-muted-foreground">
          Most frequent conversation paths and data collected at each state
        </p>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} className="mermaid" style={{ fontSize: '8px' }}>
          {diagram}
        </div>
      </CardContent>
    </Card>
  )
}
