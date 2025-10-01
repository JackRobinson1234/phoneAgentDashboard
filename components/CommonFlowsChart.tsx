'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export function CommonFlowsChart() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        primaryColor: '#ffffff',
        primaryTextColor: '#000',
        primaryBorderColor: '#000',
        lineColor: '#000',
        secondaryColor: '#f5f5f5',
        tertiaryColor: '#e0e0e0'
      },
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
    
    style START fill:#ffffff,stroke:#000,stroke-width:2px
    style GREETING fill:#f5f5f5,stroke:#000,stroke-width:2px
    style SURRENDER fill:#e0e0e0,stroke:#000,stroke-width:2px
    style EMERGENCY fill:#e0e0e0,stroke:#000,stroke-width:2px
    style FOUND fill:#e0e0e0,stroke:#000,stroke-width:2px
    style LOST fill:#e0e0e0,stroke:#000,stroke-width:2px
    style SCHEDULE fill:#d0d0d0,stroke:#000,stroke-width:2px
    style CONFIRM1 fill:#c0c0c0,stroke:#000,stroke-width:2px
    style CONFIRM2 fill:#c0c0c0,stroke:#000,stroke-width:2px
    style CONFIRM3 fill:#c0c0c0,stroke:#000,stroke-width:2px
    style CONFIRM4 fill:#c0c0c0,stroke:#000,stroke-width:2px
    style COMPLETE1 fill:#a0a0a0,stroke:#000,stroke-width:2px,color:#fff
    style COMPLETE2 fill:#a0a0a0,stroke:#000,stroke-width:2px,color:#fff
    style COMPLETE3 fill:#a0a0a0,stroke:#000,stroke-width:2px,color:#fff
    style COMPLETE4 fill:#a0a0a0,stroke:#000,stroke-width:2px,color:#fff
    style END fill:#000,stroke:#000,stroke-width:2px,color:#fff
  `

  return (
    <Card className="border-2 border-black">
      <CardHeader>
        <CardTitle>Common Call Flows</CardTitle>
        <p className="text-sm text-gray-600">
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
