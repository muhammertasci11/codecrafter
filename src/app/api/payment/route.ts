import { NextRequest, NextResponse } from 'next/server'

const GUMROAD_TOKEN = process.env.GUMROAD_TOKEN || ''

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const productId = body.productId || process.env.GUMROAD_PRODUCT_ID || ''

  if (!GUMROAD_TOKEN || !productId) {
    return NextResponse.json({
      url: `https://codecrafter-chi.vercel.app/game?paid=true`,
      message: 'Demo mod: Odeme atlandi',
    })
  }

  try {
    const res = await fetch(`https://api.gumroad.com/v2/products/${productId}`, {
      headers: { Authorization: `Bearer ${GUMROAD_TOKEN}` },
    })
    const data = await res.json()
    const product = data.product

    if (!product || !product.short_url) {
      return NextResponse.json({ url: `https://gum.co/${productId}` })
    }

    return NextResponse.json({ url: product.short_url })
  } catch {
    return NextResponse.json({ url: `https://gum.co/${productId}` })
  }
}
