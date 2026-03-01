import { NextRequest, NextResponse } from 'next/server'
import { verifyCookie, COOKIE_NAME } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME)
  const valid = await verifyCookie(cookie?.value)

  if (!valid && cookie) {
    // Strip invalid cookie so the page renders the password form
    const response = NextResponse.next()
    response.cookies.delete({
      name: COOKIE_NAME,
      path: '/d7k3m9x',
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/d7k3m9x/:path*',
}
