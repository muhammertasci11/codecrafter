import { NextRequest, NextResponse } from 'next/server'

const GUMROAD_TOKEN = process.env.GUMROAD_TOKEN || ''

export async function POST(req: NextRequest) {
  const { licenseKey, productPermalink } = await req.json()
  if (!licenseKey) {
    return NextResponse.json({ valid: false, error: 'Lisans anahtarı gerekli' }, { status: 400 })
  }

  try {
    const res = await fetch('https://api.gumroad.com/v2/licenses/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        product_permalink: productPermalink || 'codecrafter',
        license_key: licenseKey,
      }),
    })
    const data = await res.json()

    if (data.success && data.purchase) {
      return NextResponse.json({
        valid: true,
        purchase: {
          email: data.purchase.email,
          timestamp: data.purchase.sale_timestamp,
          refunded: data.purchase.refunded,
        },
      })
    }

    return NextResponse.json({ valid: false, error: data.message || 'Geçersiz lisans anahtarı' })
  } catch {
    return NextResponse.json({ valid: false, error: 'Lisans doğrulama sunucusuna bağlanılamadı' }, { status: 500 })
  }
}
