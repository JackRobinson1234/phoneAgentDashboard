'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface Props {
  diagram: string
}

export function MermaidFlowChart({ diagram }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'default',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      }
    })

    if (containerRef.current) {
      containerRef.current.innerHTML = diagram
      mermaid.contentLoaded()
    }
  }, [diagram])

  return (
    <div 
      ref={containerRef} 
      className="mermaid bg-white p-4 rounded overflow-x-auto"
    />
  )
}
