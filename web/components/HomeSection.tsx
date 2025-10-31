'use client'

import React from 'react'
import { Card, Typography, Space, Button, Avatar, Divider, Tag } from 'antd'
import { 
  LinkedinOutlined, 
  MailOutlined,
  DownloadOutlined,
  PhoneOutlined,
  GlobalOutlined,
  DesktopOutlined,
  CloudServerOutlined,
  MobileOutlined
} from '@ant-design/icons'
import { homeData } from '@/data/home.data'

const { Title, Paragraph, Text } = Typography

// Icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  DesktopOutlined: DesktopOutlined,
  CloudServerOutlined: CloudServerOutlined,
  MobileOutlined: MobileOutlined,
  GlobalOutlined: GlobalOutlined,
}

export default function HomeSection() {
  const { hero, about, skills, projects, education, organization } = homeData

  return (
    <div className="w-full min-h-[calc(100vh-96px)] p-8 md:p-4">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-12 md:gap-8">
        {/* Hero Section */}
        <section className="w-full flex justify-center py-8 md:py-4 fade-in">
          <div className="w-full max-w-[800px] px-12 py-16 md:px-6 md:py-10 rounded-3xl text-center flex flex-col items-center gap-6 md:gap-4 glass-strong">
            <Avatar 
              size={120} 
              className="border-[3px] border-primary-blue/50 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              src={hero.avatar}
            />
            <Title 
              level={1} 
              className="!m-0 bg-gradient-text bg-clip-text text-transparent text-4xl md:text-3xl font-bold"
            >
              {hero.name}
            </Title>
            <Title level={3} className="!m-0 text-white/80 md:text-lg font-normal">
              {hero.title}
            </Title>
            <Paragraph className="text-white/80 text-lg md:text-base leading-relaxed max-w-[600px] mx-auto !mb-0">
              {hero.description}
            </Paragraph>
            
            <Space size="large" className="mt-4 flex-col md:flex-row w-full md:w-auto">
              <Button 
                type="primary" 
                size="large"
                icon={<DownloadOutlined />}
                className="h-12 px-8 w-full md:w-auto text-base font-medium bg-gradient-blue border-0 shadow-blue hover:-translate-y-0.5 hover:shadow-blue-hover transition-all"
                onClick={() => {
                  window.open(hero.cvUrl, '_blank')
                }}
              >
                Download CV
              </Button>
              <Button 
                size="large"
                icon={<MailOutlined />}
                className="h-12 px-8 w-full md:w-auto text-base font-medium bg-transparent border-2 border-primary-blue/50 text-primary-blue-light hover:border-primary-blue hover:bg-primary-blue/10 hover:-translate-y-0.5 transition-all"
                onClick={() => window.location.href = hero.social.email}
              >
                Contact Me
              </Button>
            </Space>

            <Space size="large" className="mt-4">
              <a 
                href={hero.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-2xl text-white/80 hover:text-primary-blue-light hover:scale-110 transition-all"
                title="LinkedIn"
              >
                <LinkedinOutlined />
              </a>
              <a 
                href={hero.social.email} 
                className="text-2xl text-white/80 hover:text-primary-blue-light hover:scale-110 transition-all"
                title="Email"
              >
                <MailOutlined />
              </a>
              <a 
                href={hero.social.phone} 
                className="text-2xl text-white/80 hover:text-primary-blue-light hover:scale-110 transition-all"
                title="Phone"
              >
                <PhoneOutlined />
              </a>
            </Space>

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <Tag color="blue" className="text-sm px-3 py-1 border-primary-blue/50 bg-primary-blue/10 text-primary-blue-light">
                <PhoneOutlined /> {hero.phone}
              </Tag>
              <Tag color="blue" className="text-sm px-3 py-1 border-primary-blue/50 bg-primary-blue/10 text-primary-blue-light">
                <MailOutlined /> {hero.email}
              </Tag>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="w-full fade-in">
          <Card className="rounded-[20px] p-8 md:p-6 glass">
            <Title level={2} className="!m-0 text-white text-3xl md:text-2xl font-semibold">About Me</Title>
            <Divider className="!border-white/10 !my-6" />
            {about.paragraphs.map((paragraph, index) => (
              <div
                key={index}
                className="text-white/80 text-lg md:text-base leading-relaxed mb-4 last:mb-0"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </Card>
        </section>

        {/* Skills Section */}
        <section className="w-full fade-in">
          <Card className="rounded-[20px] p-8 md:p-6 glass">
            <Title level={2} className="!m-0 text-white text-3xl md:text-2xl font-semibold">Skills</Title>
            <Divider className="!border-white/10 !my-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className="p-8 rounded-2xl glass-soft hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-blue/20 transition-all text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary-blue/20 border border-primary-blue/50 flex items-center justify-center mb-4">
                    {iconMap[skill.icon] && (
                      <span className="text-3xl text-primary-blue-light">
                        {React.createElement(iconMap[skill.icon])}
                      </span>
                    )}
                  </div>
                  <Title level={3} className="!mb-2 text-white text-xl font-semibold">{skill.title}</Title>
                  <Text className="text-white/70 text-base leading-relaxed">
                    {skill.description}
                  </Text>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Experience Section */}
        <section className="w-full fade-in">
          <Card className="rounded-[20px] p-8 md:p-6 glass">
            <Title level={2} className="!m-0 text-white text-3xl md:text-2xl font-semibold">Key Projects</Title>
            <Divider className="!border-white/10 !my-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-2xl glass-soft hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-blue/20 transition-all flex flex-col"
                >
                  <div className="mb-3">
                    <div className="flex items-start justify-between mb-2">
                      <Title level={4} className="!m-0 text-white text-xl">{project.title}</Title>
                      {project.badge && (
                        <Tag color="green" className="bg-green-500/20 border-green-500/50 text-green-400 flex-shrink-0 ml-2">
                          {iconMap[project.badge.icon] && React.createElement(iconMap[project.badge.icon])} {project.badge.label}
                        </Tag>
                      )}
                    </div>
                    <Text className="text-primary-blue-light text-sm">{project.company} · {project.period}</Text>
                  </div>
                  <Text className="text-white/70 text-base leading-relaxed block mb-3 flex-grow">
                    {project.description}
                  </Text>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag, tagIndex) => (
                      <Tag 
                        key={tagIndex}
                        color="blue" 
                        className="bg-primary-blue/20 border-primary-blue/50 text-primary-blue-light text-xs"
                      >
                        {tag.label}
                      </Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Education Section */}
        <section className="w-full fade-in">
          <Card className="rounded-[20px] p-8 md:p-6 glass">
            <Title level={2} className="!m-0 text-white text-3xl md:text-2xl font-semibold">Education & Organization</Title>
            <Divider className="!border-white/10 !my-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl glass-soft">
                <Title level={4} className="!mb-2 text-white text-lg">Education</Title>
                <Text className="text-white/90 text-base font-semibold block mb-2">
                  {education.degree}
                </Text>
                <Text className="text-primary-blue-light text-sm block mb-1">
                  {education.institution}
                </Text>
                <Text className="text-white/60 text-sm">
                  {education.period} · {education.location}
                </Text>
              </div>
              <div className="p-6 rounded-2xl glass-soft">
                <Title level={4} className="!mb-2 text-white text-lg">Organization</Title>
                <Text className="text-white/90 text-base font-semibold block mb-2">
                  {organization.name}
                </Text>
                <Text className="text-primary-blue-light text-sm block mb-1">
                  {organization.institution}
                </Text>
                <Text className="text-white/60 text-sm block mb-2">
                  {organization.period}
                </Text>
                <Text className="text-white/70 text-sm">
                  {organization.activities.map((activity, index) => (
                    <span key={index}>
                      • {activity}
                      {index < organization.activities.length - 1 && <br />}
                    </span>
                  ))}
                </Text>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
