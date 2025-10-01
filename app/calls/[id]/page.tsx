import { getCallById } from '@/lib/queries'
import { CallDetail } from '@/components/CallDetail'
import { notFound } from 'next/navigation'

export default async function CallDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  try {
    const data = await getCallById(params.id)
    return <CallDetail call={data.call} transitions={data.transitions} />
  } catch (error) {
    notFound()
  }
}
