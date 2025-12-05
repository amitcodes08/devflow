import type { Metadata } from 'next'
// @ts-ignore: allow side-effect import of global CSS without type declarations
import './globals.css'
import localFont from 'next/font/local'
import  ThemeProvider  from '../context/Theme'
import { Toaster } from '@/components/ui/sonner'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'


export const metadata: Metadata = {
  title: 'DevFlow',
  description: 'A better way to manage your development workflow.',
}



const inter = localFont({
  src: './fonts/InterVF.ttf',
  variable: '--font-inter',
  weight: "100 200 300 400 500 600 700 800 900", 
})

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {

  const session = await auth();

  console.log("User session in RootLayout:", session);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <SessionProvider session={session}>
        <body className={`${inter.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  )
}

export default RootLayout
