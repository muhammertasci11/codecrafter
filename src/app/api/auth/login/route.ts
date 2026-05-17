import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getDb } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  if (!username || !password) {
    return NextResponse.json({ error: 'Kullanıcı adı ve şifre gerekli' }, { status: 400 })
  }
  try {
    const db = getDb()
    const result = await db.execute({ sql: 'SELECT id, username, password FROM users WHERE username = ?', args: [username] })
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 401 })
    }
    const user = result.rows[0] as unknown as { id: number; username: string; password: string }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return NextResponse.json({ error: 'Hatalı şifre' }, { status: 401 })
    }
    const token = Buffer.from(`${user.id}:${user.username}`).toString('base64')
    return NextResponse.json({ token, user: { id: Number(user.id), username: user.username } })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Giriş hatası' }, { status: 500 })
  }
}
