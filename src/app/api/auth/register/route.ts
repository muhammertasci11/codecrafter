import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getDb } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  if (!username || !password || username.length < 3 || password.length < 4) {
    return NextResponse.json({ error: 'Kullanıcı adı en az 3, şifre en az 4 karakter olmalı' }, { status: 400 })
  }
  try {
    const db = getDb()
    const existing = await db.execute({ sql: 'SELECT id FROM users WHERE username = ?', args: [username] })
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'Bu kullanıcı adı zaten alınmış' }, { status: 409 })
    }
    const hashed = await bcrypt.hash(password, 10)
    const result = await db.execute({ sql: 'INSERT INTO users (username, password) VALUES (?, ?)', args: [username, hashed] })
    const token = Buffer.from(`${result.lastInsertRowid?.toString() || ''}:${username}`).toString('base64')
    return NextResponse.json({ token, user: { id: result.lastInsertRowid ? result.lastInsertRowid.toString() : null, username } })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Kayıt hatası' }, { status: 500 })
  }
}
