import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import  ThemeProvider  from '../context/Theme'
import Navbar from '@/components/navigation/navbar'

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
