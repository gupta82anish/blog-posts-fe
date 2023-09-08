import './globals.css'
import Link from 'next/link'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <Link href="/">
            Home
          </Link>
          <Link href="/posts">
            Posts
          </Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
