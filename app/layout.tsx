import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sleem',
  description: 'Sleem for Clinics',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar">
      <body className="bg-white text-black antialiased">{children}</body>
    </html>
  )
}
