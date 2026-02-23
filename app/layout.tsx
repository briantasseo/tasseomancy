import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tasseomancy Studios',
  description: 'A new studio shaping how cinema gets made',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
