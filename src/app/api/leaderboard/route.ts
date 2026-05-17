import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!auth) return NextResponse.json({ error: 'Giriş yapmalısınız' }, { status: 401 })
  const [userId, username] = Buffer.from(auth, 'base64').toString().split(':')

  const { challengesCompleted, bossesDefeated, totalScore } = await req.json()
  if (typeof totalScore !== 'number') return NextResponse.json({ error: 'totalScore gerekli' }, { status: 400 })

  try {
    const db = getDb()
    const existing = await db.execute({ sql: 'SELECT id FROM leaderboard WHERE user_id = ?', args: [parseInt(userId)] })
    if (existing.rows.length > 0) {
      await db.execute({
        sql: "UPDATE leaderboard SET challenges_completed = ?, bosses_defeated = ?, total_score = ?, updated_at = datetime('now') WHERE user_id = ?",
        args: [challengesCompleted || 0, bossesDefeated || 0, totalScore, parseInt(userId)],
      })
    } else {
      await db.execute({
        sql: 'INSERT INTO leaderboard (user_id, username, challenges_completed, bosses_defeated, total_score) VALUES (?, ?, ?, ?, ?)',
        args: [parseInt(userId), username, challengesCompleted || 0, bossesDefeated || 0, totalScore],
      })
    }
    return NextResponse.json({ saved: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const db = getDb()
    const result = await db.execute({
      sql: 'SELECT username, challenges_completed, bosses_defeated, total_score, updated_at FROM leaderboard ORDER BY total_score DESC LIMIT 50',
    })
    const rows = result.rows.map((r: any) => ({
      username: r.username,
      challenges_completed: r.challenges_completed,
      bosses_defeated: r.bosses_defeated,
      total_score: r.total_score,
      updated_at: r.updated_at,
    }))
    return NextResponse.json({ leaderboard: rows })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
