import { NextRequest, NextResponse } from 'next/server'
import { signCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const expected = process.env.AA_DECK_PASSWORD

    if (!expected) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    if (password !== expected) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const cookie = await signCookie()
    const response = NextResponse.json({ ok: true })
    response.cookies.set(cookie.name, cookie.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/k8f2q7w',
      maxAge: cookie.maxAge,
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
