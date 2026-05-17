import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, unauthorized, getProgress, saveProgress } from '@/lib/api/auth'

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (!auth) return unauthorized()

  const user = verifyToken(auth.replace('Bearer ', ''))
  if (!user) return unauthorized()

  const { amount } = await req.json()
  if (typeof amount !== 'number' || amount <= 0 || amount > 100) {
    return NextResponse.json({ error: 'Gecersiz miktar' }, { status: 400 })
  }

  const progress = (await getProgress(user.userId)) || {}
  const adRevenue = (progress.adRevenue || 0) + Math.floor(amount)
  progress.adRevenue = adRevenue
  await saveProgress(user.userId, progress)

  return NextResponse.json({ adRevenue })
}
