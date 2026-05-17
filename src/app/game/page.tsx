import { Suspense } from 'react'
import GameClient from './client'

export const dynamic = 'force-dynamic'

export default function GamePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center"><p className="text-gray-400">Yükleniyor...</p></div>}>
      <GameClient />
    </Suspense>
  )
}
