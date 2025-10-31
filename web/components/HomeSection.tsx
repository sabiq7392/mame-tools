'use client'

import { Card, Typography, Space, Button, Avatar, Divider } from 'antd'
import { 
  GithubOutlined, 
  LinkedinOutlined, 
  MailOutlined,
  DownloadOutlined 
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

export default function HomeSection() {
  return (
    <div className="w-full min-h-[calc(100vh-96px)] p-8 md:p-4">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-12 md:gap-8">
        {/* Hero Section */}
        <section className="w-full flex justify-center py-8 md:py-4 fade-in">
          <div className="w-full max-w-[800px] px-12 py-16 md:px-6 md:py-10 rounded-3xl text-center flex flex-col items-center gap-6 md:gap-4 glass-strong">
            <Avatar 
              size={120} 
              className="border-[3px] border-primary-blue/50 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              src="/assets/logo.svg"
            />
            <Title 
              level={1} 
              className="!m-0 bg-gradient-text bg-clip-text text-transparent text-4xl md:text-3xl font-bold"
            >
              Sabiq Muhammad Antebing Mame
            </Title>
            <Title level={3} className="!m-0 text-white/80 md:text-lg font-normal">
              Software Developer & Engineer
            </Title>
            <Paragraph className="text-white/80 text-lg md:text-base leading-relaxed max-w-[600px] mx-auto !mb-0">
              Passionate developer with expertise in building modern web applications 
              and creating innovative solutions. Always eager to learn and contribute 
              to meaningful projects.
            </Paragraph>
            
            <Space size="large" className="mt-4 flex-col md:flex-row w-full md:w-auto">
              <Button 
                type="primary" 
                size="large"
                icon={<DownloadOutlined />}
                className="h-12 px-8 w-full md:w-auto text-base font-medium bg-gradient-blue border-0 shadow-blue hover:-translate-y-0.5 hover:shadow-blue-hover transition-all"
                onClick={() => {
                  window.open('/assets/Sabiq Muhammad Antebing Mame - CV.pdf', '_blank')
                }}
              >
                Download CV
              </Button>
              <Button 
                size="large"
                icon={<MailOutlined />}
                className="h-12 px-8 w-full md:w-auto text-base font-medium bg-transparent border-2 border-primary-blue/50 text-primary-blue-light hover:border-primary-blue hover:bg-primary-blue/10 hover:-translate-y-0.5 transition-all"
              >
                Contact Me
              </Button>
            </Space>

            <Space size="large" className="mt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-white/80 hover:text-primary-blue-light hover:scale-110 transition-all">
                <GithubOutlined />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-white/80 hover:text-primary-blue-light hover:scale-110 transition-all">
                <LinkedinOutlined />
              </a>
              <a href="mailto:contact@sabiq.pro" className="text-2xl text-white/80 hover:text-primary-blue-light hover:scale-110 transition-all">
                <MailOutlined />
              </a>
            </Space>
          </div>
        </section>

        {/* About Section */}
        <section className="w-full fade-in">
          <Card className="rounded-[20px] p-8 md:p-6 glass">
            <Title level={2} className="!m-0 text-white text-3xl md:text-2xl font-semibold">About Me</Title>
            <Divider className="!border-white/10 !my-6" />
            <Paragraph className="text-white/80 text-lg md:text-base leading-relaxed !mb-4">
              I'm a dedicated software developer with a passion for creating elegant 
              and efficient solutions. My journey in technology has led me to explore 
              various aspects of software development, from frontend design to backend 
              architecture.
            </Paragraph>
            <Paragraph className="text-white/80 text-lg leading-relaxed !mb-4">
              I enjoy working with modern technologies and frameworks, always staying 
              up-to-date with the latest industry trends. My goal is to build applications 
              that not only function well but also provide exceptional user experiences.
            </Paragraph>
          </Card>
        </section>

        {/* Skills Section */}
        <section className="w-full fade-in">
          <Card className="rounded-[20px] p-8 md:p-6 glass">
            <Title level={2} className="!m-0 text-white text-3xl md:text-2xl font-semibold">Skills & Expertise</Title>
            <Divider className="!border-white/10 !my-6" />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-1 gap-6 mt-6">
              <div className="p-6 rounded-2xl glass-soft hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-blue/20 transition-all">
                <Title level={4} className="!mb-3 text-white text-xl">Frontend Development</Title>
                <Text className="text-white/60 text-sm leading-relaxed">
                  React, Next.js, TypeScript, HTML5, CSS3
                </Text>
              </div>
              <div className="p-6 rounded-2xl glass-soft hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-blue/20 transition-all">
                <Title level={4} className="!mb-3 text-white text-xl">Backend Development</Title>
                <Text className="text-white/60 text-sm leading-relaxed">
                  Node.js, RESTful APIs, Database Design
                </Text>
              </div>
              <div className="p-6 rounded-2xl glass-soft hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-blue/20 transition-all">
                <Title level={4} className="!mb-3 text-white text-xl">Tools & Technologies</Title>
                <Text className="text-white/60 text-sm leading-relaxed">
                  Git, Docker, CI/CD, Cloud Services
                </Text>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
