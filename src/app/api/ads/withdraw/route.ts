import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, unauthorized, getProgress, saveProgress } from '@/lib/api/auth'

const MIN_WITHDRAWAL = 1
const MAX_WITHDRAWAL = 1000

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (!auth) return unauthorized()

  const user = verifyToken(auth.replace('Bearer ', ''))
  if (!user) return unauthorized()

  const { amount } = await req.json()
  if (typeof amount !== 'number' || amount < MIN_WITHDRAWAL || amount > MAX_WITHDRAWAL) {
    return NextResponse.json({ error: `Gecersiz miktar (min: ${MIN_WITHDRAWAL}, max: ${MAX_WITHDRAWAL})` }, { status: 400 })
  }

  const progress = (await getProgress(user.userId)) || {}
  const currentRevenue = progress.adRevenue || 0

  if (currentRevenue < amount) {
    return NextResponse.json({ error: 'Yetersiz bakiye' }, { status: 400 })
  }

  const adRevenue = currentRevenue - amount
  progress.adRevenue = adRevenue
  await saveProgress(user.userId, progress)

  return NextResponse.json({ adRevenue, withdrawn: amount })
}
