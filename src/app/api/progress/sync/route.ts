import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!auth) return NextResponse.json({ error: 'Giriş yapmalısınız' }, { status: 401 })
  const [userId] = Buffer.from(auth, 'base64').toString().split(':')

  const { data } = await req.json()
  if (!data) return NextResponse.json({ error: 'data gerekli' }, { status: 400 })

  try {
    const db = getDb()
    const existing = await db.execute({ sql: 'SELECT id FROM progress WHERE user_id = ?', args: [parseInt(userId)] })
    if (existing.rows.length > 0) {
      await db.execute({ sql: "UPDATE progress SET data = ?, updated_at = datetime('now') WHERE user_id = ?", args: [JSON.stringify(data), parseInt(userId)] })
    } else {
      await db.execute({ sql: 'INSERT INTO progress (user_id, data) VALUES (?, ?)', args: [parseInt(userId), JSON.stringify(data)] })
    }
    return NextResponse.json({ synced: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!auth) return NextResponse.json({ error: 'Giriş yapmalısınız' }, { status: 401 })
  const [userId] = Buffer.from(auth, 'base64').toString().split(':')

  try {
    const db = getDb()
    const result = await db.execute({ sql: 'SELECT data, updated_at FROM progress WHERE user_id = ?', args: [parseInt(userId)] })
    if (result.rows.length === 0) return NextResponse.json({ data: null })
    const row = result.rows[0] as unknown as { data: string; updated_at: string }
    return NextResponse.json({ data: JSON.parse(row.data), updatedAt: row.updated_at })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
