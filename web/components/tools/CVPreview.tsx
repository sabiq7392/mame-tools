'use client'

import { Card, Typography } from 'antd'
import ReactMarkdown from 'react-markdown'
import { CVData } from '@/data/cv-maker.data'
import { generateCVMarkdown } from '@/utils/cv-generator'

const { Title } = Typography

interface CVPreviewProps {
  cvData: CVData
}

export default function CVPreview({ cvData }: CVPreviewProps) {
  const markdown = generateCVMarkdown(cvData)

  return (
    <Card className="rounded-[20px] p-8 md:p-6 glass-strong h-full flex flex-col">
      <Title level={3} className="!mb-4 text-white text-2xl font-semibold flex-shrink-0">
        Preview
      </Title>
      <div className="cv-preview prose prose-invert max-w-none overflow-y-auto flex-1 pr-2 max-h-[calc(100vh-200px)]">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-white mb-4">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold text-white mt-6 mb-3">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="text-white/80 mb-4 leading-relaxed">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside text-white/80 mb-4 space-y-2">{children}</ul>
            ),
            li: ({ children }) => (
              <li className="text-white/80">{children}</li>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-white">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic text-white/90">{children}</em>
            ),
            a: ({ href, children }) => (
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-blue-light hover:text-primary-blue underline"
              >
                {children}
              </a>
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </Card>
  )
}
