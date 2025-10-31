'use client'

import { Card, Typography, Space, Button, Avatar, Divider, Tag } from 'antd'
import { 
  GithubOutlined, 
  LinkedinOutlined, 
  MailOutlined,
  DownloadOutlined,
  PhoneOutlined,
  GlobalOutlined,
  DesktopOutlined,
  CloudServerOutlined,
  MobileOutlined
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
              Full-Stack Developer
            </Title>
            <Paragraph className="text-white/80 text-lg md:text-base leading-relaxed max-w-[600px] mx-auto !mb-0">
              Full-Stack Developer with expertise in website and backend development, specializing in building efficient, 
              scalable, and well-structured systems. Skilled in database management, ensuring data integrity, and maintaining 
              strict validation. Proficient in optimizing system performance and implementing seamless user experiences.
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
                onClick={() => window.location.href = 'mailto:sabiqmuhammad98@gmail.com'}
              >
                Contact Me
              </Button>
            </Space>

            <Space size="large" className="mt-4">
              <a 
                href="https://www.linkedin.com/in/sabiq-muhammad-6b314a210/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-2xl text-white/80 hover:text-primary-blue-light hover:scale-110 transition-all"
                title="LinkedIn"
              >
                <LinkedinOutlined />
              </a>
              <a 
                href="mailto:sabiqmuhammad98@gmail.com" 
                className="text-2xl text-white/80 hover:text-primary-blue-light hover:scale-110 transition-all"
                title="Email"
              >
                <MailOutlined />
              </a>
              <a 
                href="tel:+6285691550726" 
                className="text-2xl text-white/80 hover:text-primary-blue-light hover:scale-110 transition-all"
                title="Phone"
              >
                <PhoneOutlined />
              </a>
            </Space>

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <Tag color="blue" className="text-sm px-3 py-1 border-primary-blue/50 bg-primary-blue/10 text-primary-blue-light">
                <PhoneOutlined /> (+62) 85691550726
              </Tag>
              <Tag color="blue" className="text-sm px-3 py-1 border-primary-blue/50 bg-primary-blue/10 text-primary-blue-light">
                <MailOutlined /> sabiqmuhammad98@gmail.com
              </Tag>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="w-full fade-in">
          <Card className="rounded-[20px] p-8 md:p-6 glass">
            <Title level={2} className="!m-0 text-white text-3xl md:text-2xl font-semibold">About Me</Title>
            <Divider className="!border-white/10 !my-6" />
            <Paragraph className="text-white/80 text-lg md:text-base leading-relaxed !mb-4">
              I'm a Full-Stack Developer with expertise in website and backend development, specializing in building efficient, 
              scalable, and well-structured systems. I'm skilled in database management, ensuring data integrity, eliminating 
              duplication, and maintaining strict validation.
            </Paragraph>
            <Paragraph className="text-white/80 text-lg md:text-base leading-relaxed !mb-4">
              I'm proficient in optimizing system performance, implementing seamless user experiences, and integrating logging 
              mechanisms for effective monitoring and issue resolution. I'm dedicated to developing secure, high-performance 
              applications that align with business and user needs.
            </Paragraph>
            <Paragraph className="text-white/80 text-lg md:text-base leading-relaxed !mb-0">
              Currently working at <strong className="text-white">PT. Quantum Teknologi Nusantara</strong> since January 2022, 
              where I've developed various web-based systems and mobile applications for government and commercial clients.
            </Paragraph>
          </Card>
        </section>

        {/* Skills Section */}
        <section className="w-full fade-in">
          <Card className="rounded-[20px] p-8 md:p-6 glass">
            <Title level={2} className="!m-0 text-white text-3xl md:text-2xl font-semibold">Skills</Title>
            <Divider className="!border-white/10 !my-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="p-8 rounded-2xl glass-soft hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-blue/20 transition-all text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary-blue/20 border border-primary-blue/50 flex items-center justify-center mb-4">
                  <DesktopOutlined className="text-3xl text-primary-blue-light" />
                </div>
                <Title level={3} className="!mb-2 text-white text-xl font-semibold">Front-End Engineer</Title>
                <Text className="text-white/70 text-base leading-relaxed">
                  Building responsive and interactive user interfaces with modern frameworks
                </Text>
              </div>
              <div className="p-8 rounded-2xl glass-soft hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-blue/20 transition-all text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary-blue/20 border border-primary-blue/50 flex items-center justify-center mb-4">
                  <CloudServerOutlined className="text-3xl text-primary-blue-light" />
                </div>
                <Title level={3} className="!mb-2 text-white text-xl font-semibold">Back-End Engineer</Title>
                <Text className="text-white/70 text-base leading-relaxed">
                  Developing scalable server-side systems and APIs with robust architecture
                </Text>
              </div>
              <div className="p-8 rounded-2xl glass-soft hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-blue/20 transition-all text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary-blue/20 border border-primary-blue/50 flex items-center justify-center mb-4">
                  <MobileOutlined className="text-3xl text-primary-blue-light" />
                </div>
                <Title level={3} className="!mb-2 text-white text-xl font-semibold">Mobile Engineer</Title>
                <Text className="text-white/70 text-base leading-relaxed">
                  Creating cross-platform mobile applications with native performance
                </Text>
              </div>
            </div>
          </Card>
        </section>

        {/* Experience Section */}
        <section className="w-full fade-in">
          <Card className="rounded-[20px] p-8 md:p-6 glass">
            <Title level={2} className="!m-0 text-white text-3xl md:text-2xl font-semibold">Key Projects</Title>
            <Divider className="!border-white/10 !my-6" />
            <div className="space-y-6">
              <div className="p-6 rounded-2xl glass-soft hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-blue/20 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Title level={4} className="!m-0 !mb-2 text-white text-xl">BSMR (Badan Sertifikasi Manajemen Risiko)</Title>
                    <Text className="text-primary-blue-light text-sm">PT. Quantum Teknologi Nusantara · Jan 2022 - Now</Text>
                  </div>
                </div>
                <Text className="text-white/70 text-base leading-relaxed block mb-3">
                  Web-based certification system for training providers, streamlining application, payment, and certification issuance processes.
                </Text>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Tag color="blue" className="bg-primary-blue/20 border-primary-blue/50 text-primary-blue-light text-xs">Docker</Tag>
                  <Tag color="blue" className="bg-primary-blue/20 border-primary-blue/50 text-primary-blue-light text-xs">Elasticsearch</Tag>
                  <Tag color="blue" className="bg-primary-blue/20 border-primary-blue/50 text-primary-blue-light text-xs">PDF Generation</Tag>
                  <Tag color="blue" className="bg-primary-blue/20 border-primary-blue/50 text-primary-blue-light text-xs">Payment Integration</Tag>
                </div>
              </div>

              <div className="p-6 rounded-2xl glass-soft hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-blue/20 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Title level={4} className="!m-0 !mb-2 text-white text-xl">POLRI SuperApp</Title>
                    <Text className="text-primary-blue-light text-sm">PT. Quantum Teknologi Nusantara · Jan 2022 - Now</Text>
                  </div>
                  <Tag color="green" className="bg-green-500/20 border-green-500/50 text-green-400">
                    <GlobalOutlined /> App Store & Play Store
                  </Tag>
                </div>
                <Text className="text-white/70 text-base leading-relaxed block mb-3">
                  Comprehensive mobile application for the public to access Indonesian National Police services, including SKCK, SIM, STNK, DUMAS, eSurvey, E-Tilang, SP2HP.
                </Text>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Tag color="blue" className="bg-primary-blue/20 border-primary-blue/50 text-primary-blue-light text-xs">Flutter</Tag>
                  <Tag color="blue" className="bg-primary-blue/20 border-primary-blue/50 text-primary-blue-light text-xs">Dynamic Form Builder</Tag>
                  <Tag color="blue" className="bg-primary-blue/20 border-primary-blue/50 text-primary-blue-light text-xs">BPJS Integration</Tag>
                  <Tag color="blue" className="bg-primary-blue/20 border-primary-blue/50 text-primary-blue-light text-xs">Firebase Push Notifications</Tag>
                </div>
              </div>

              <div className="p-6 rounded-2xl glass-soft hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-blue/20 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Title level={4} className="!m-0 !mb-2 text-white text-xl">Kenangan App</Title>
                    <Text className="text-primary-blue-light text-sm">PT. Quantum Teknologi Nusantara · Jan 2022 - Now</Text>
                  </div>
                  <Tag color="green" className="bg-green-500/20 border-green-500/50 text-green-400">
                    <GlobalOutlined /> App Store & Play Store
                  </Tag>
                </div>
                <Text className="text-white/70 text-base leading-relaxed block mb-3">
                  Unique e-commerce platform designed for seamless gift-giving, allowing users to send gifts without requiring the recipient's address, shop for various products, and create celebration videos.
                </Text>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Tag color="blue" className="bg-primary-blue/20 border-primary-blue/50 text-primary-blue-light text-xs">E-Commerce</Tag>
                  <Tag color="blue" className="bg-primary-blue/20 border-primary-blue/50 text-primary-blue-light text-xs">Drag & Drop Editor</Tag>
                  <Tag color="blue" className="bg-primary-blue/20 border-primary-blue/50 text-primary-blue-light text-xs">Video Creation</Tag>
                </div>
              </div>
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
                  Bachelor of Computer Science
                </Text>
                <Text className="text-primary-blue-light text-sm block mb-1">
                  Sekolah Tinggi Teknologi Terpadu Nurul Fikri
                </Text>
                <Text className="text-white/60 text-sm">
                  Sept 2020 – Sept 2024 · Jakarta, Indonesia
                </Text>
              </div>
              <div className="p-6 rounded-2xl glass-soft">
                <Title level={4} className="!mb-2 text-white text-lg">Organization</Title>
                <Text className="text-white/90 text-base font-semibold block mb-2">
                  Google Developer Student Club (GDSC)
                </Text>
                <Text className="text-primary-blue-light text-sm block mb-1">
                  STT Terpadu Nurul Fikri
                </Text>
                <Text className="text-white/60 text-sm block mb-2">
                  Dec 2022 – Aug 2023
                </Text>
                <Text className="text-white/70 text-sm">
                  • Organized and managed frontend team<br/>
                  • Led 3-month bootcamp as instructor<br/>
                  • Speaker for Frontend Intermediate Workshop
                </Text>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
