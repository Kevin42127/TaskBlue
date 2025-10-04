import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'react-datepicker/dist/react-datepicker.css'
import { I18nProvider } from '@/context/I18nContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TaskBlue',
  description: 'TaskBlue 是一個現代化的個人任務管理工具，使用藍色主題設計，幫助您高效管理日常任務。',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </I18nProvider>
      </body>
    </html>
  )
}
