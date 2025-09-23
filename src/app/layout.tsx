import type { Metadata } from 'next'
import './globals.css'
import { AppErrorBoundary } from '@/components/ui/ErrorBoundaries'

export const metadata: Metadata = {
  title: '✋ Five Alike - Discover what you\'ll love next',
  description: 'A social recommendation platform where users create curated "if you like X, you\'ll like Y" lists',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <AppErrorBoundary>
          <div className="flex pt-20">
            <main className="flex-1">
              {children}
            </main>
          </div>
        </AppErrorBoundary>
      </body>
    </html>
  )
}
