import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Call Not Found</h2>
      <p className="text-muted-foreground mb-8">
        The call you're looking for doesn't exist or has been removed.
      </p>
      <Link href="/" className="text-blue-600 hover:underline">
        Return to Dashboard
      </Link>
    </div>
  )
}
