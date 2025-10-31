import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ConfigProvider } from 'antd'
import { antdTheme } from '@/theme/antd-theme'
import StyledComponentsRegistry from '@/lib/AntdRegistry'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sabiq Muhammad Antebing Mame | Full-Stack Developer',
  description: 'Full-Stack Developer with expertise in website and backend development. Specializing in building efficient, scalable, and well-structured systems. Currently working at PT. Quantum Teknologi Nusantara.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ConfigProvider theme={antdTheme}>
            {children}
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
