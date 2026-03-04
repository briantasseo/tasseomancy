import { cookies } from 'next/headers'
import { verifyCookie, COOKIE_NAME } from '@/lib/auth'
import AAPitchDeck from '@/components/AAPitchDeck'
import DeckAuth from '@/components/DeckAuth'

export const dynamic = 'force-dynamic'

export const metadata = {
  robots: 'noindex, nofollow',
}

export default async function AADeckPage() {
  const cookieStore = cookies()
  const cookie = cookieStore.get(COOKIE_NAME)
  const authed = await verifyCookie(cookie?.value)

  if (!authed) {
    return <DeckAuth authEndpoint="/api/aa-deck-auth" />
  }

  return <AAPitchDeck />
}
