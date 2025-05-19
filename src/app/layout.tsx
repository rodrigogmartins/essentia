import './globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Essentia',
  description: 'Descubra fragrâncias que revelam sua essência',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={cn(inter.className, 'bg-[#f7f5f2] text-neutral-900 min-h-screen flex flex-col font-light tracking-wide')}>        
        <Link href="/" className="p-6 text-center text-3xl font-semibold tracking-[0.15em] text-neutral-200 uppercase">
          Essentia
        </Link>
        <main className="flex-1 w-full max-w-4xl mx-auto px-4">
          {children}
        </main>
        <footer className="text-center text-sm font-semibold text-neutral-300 py-6 border-t border-neutral-300 mt-12">© {new Date().getFullYear()} Essentia</footer>
      </body>
    </html>
  )
}
