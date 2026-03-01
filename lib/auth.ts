const COOKIE_NAME = '_da'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function getSecret(): string {
  const secret = process.env.DECK_SECRET
  if (!secret) throw new Error('DECK_SECRET env var is not set')
  return secret
}

async function hmacSign(data: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function signCookie(): Promise<{
  name: string
  value: string
  maxAge: number
}> {
  const timestamp = Date.now().toString()
  const sig = await hmacSign(timestamp)
  return {
    name: COOKIE_NAME,
    value: `${timestamp}.${sig}`,
    maxAge: COOKIE_MAX_AGE,
  }
}

export async function verifyCookie(
  cookieValue: string | undefined
): Promise<boolean> {
  if (!cookieValue) return false
  const dotIndex = cookieValue.indexOf('.')
  if (dotIndex === -1) return false

  const timestamp = cookieValue.slice(0, dotIndex)
  const sig = cookieValue.slice(dotIndex + 1)

  // Check expiry
  const age = Date.now() - Number(timestamp)
  if (isNaN(age) || age > COOKIE_MAX_AGE * 1000) return false

  const expectedSig = await hmacSign(timestamp)
  return sig === expectedSig
}

export { COOKIE_NAME }
