'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function Filters() {
  const [status, setStatus] = useState<string>('')
  
  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-2">
        <Button 
          variant={status === '' ? 'default' : 'outline'}
          onClick={() => setStatus('')}
          size="sm"
        >
          All
        </Button>
        <Button 
          variant={status === 'completed' ? 'default' : 'outline'}
          onClick={() => setStatus('completed')}
          size="sm"
        >
          Completed
        </Button>
        <Button 
          variant={status === 'error' ? 'default' : 'outline'}
          onClick={() => setStatus('error')}
          size="sm"
        >
          Error
        </Button>
        <Button 
          variant={status === 'in_progress' ? 'default' : 'outline'}
          onClick={() => setStatus('in_progress')}
          size="sm"
        >
          In Progress
        </Button>
      </div>
    </div>
  )
}
