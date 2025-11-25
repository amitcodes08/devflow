import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: 'DevFlow',
  description: 'A better way to manage your development workflow.',
}



const inter = localFont({
  src: './fonts/InterVF.ttf',
  variable: '--font-inter',
  weight: "100 200 300 400 500 600 700 800 900", 
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
