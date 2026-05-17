import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export function verifyToken(token: string): { userId: number; username: string } | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [id, username] = decoded.split(':')
    const userId = parseInt(id, 10)
    if (!userId || !username) return null
    return { userId, username }
  } catch {
    return null
  }
}

export function unauthorized() {
  return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
}

export async function getProgress(userId: number) {
  const db = getDb()
  const result = await db.execute({
    sql: 'SELECT data FROM progress WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1',
    args: [userId],
  })
  if (result.rows.length === 0) return null
  return JSON.parse(result.rows[0].data as string)
}

export async function saveProgress(userId: number, data: any) {
  const db = getDb()
  const json = JSON.stringify(data)
  const existing = await db.execute({
    sql: 'SELECT id FROM progress WHERE user_id = ?',
    args: [userId],
  })
  if (existing.rows.length > 0) {
    await db.execute({
      sql: 'UPDATE progress SET data = ?, updated_at = datetime("now") WHERE user_id = ?',
      args: [json, userId],
    })
  } else {
    await db.execute({
      sql: 'INSERT INTO progress (user_id, data) VALUES (?, ?)',
      args: [userId, json],
    })
  }
}
