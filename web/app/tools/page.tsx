import Navbar from '@/components/Navbar'
import { Typography } from 'antd'

const { Title } = Typography

export default function ToolsPage() {
  return (
    <main className="min-h-screen w-full relative pt-24">
      <Navbar />
      <div className="w-full min-h-[calc(100vh-80px)] p-8 flex justify-center items-center">
        <div className="w-full max-w-[800px] px-12 py-16 rounded-3xl text-center glass-strong">
          <Title level={1} className="!text-white">My Tools</Title>
          <Title level={4} className="!text-white/60">Coming soon...</Title>
        </div>
      </div>
    </main>
  )
}
