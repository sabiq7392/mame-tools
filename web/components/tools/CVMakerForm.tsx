'use client'

import { useState, useEffect } from 'react'
import { 
  Card, 
  Typography, 
  Form, 
  Input, 
  Button, 
  Divider,
  Space,
  InputNumber
} from 'antd'
import { DownloadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { CVData, defaultCVData, CVProject } from '@/data/cv-maker.data'
import { downloadCV } from '@/utils/cv-generator'

const { Title, Text } = Typography
const { TextArea } = Input

const STORAGE_KEY = 'cv-maker-data'

export default function CVMakerForm() {
  const [form] = Form.useForm()
  const [cvData, setCvData] = useState<CVData>(defaultCVData)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        
        // Transform saved data back to form format
        const formData: any = {
          name: parsedData.personalInfo?.name || '',
          phone: parsedData.personalInfo?.phone || '',
          email: parsedData.personalInfo?.email || '',
          linkedin: parsedData.personalInfo?.linkedin || '',
          profile: parsedData.profile || '',
          projects: parsedData.projects?.map((project: any) => ({
            ...project,
            achievements: Array.isArray(project.achievements) 
              ? project.achievements.join('\n')
              : project.achievements || ''
          })) || [],
          degree: parsedData.education?.degree || '',
          institution: parsedData.education?.institution || '',
          educationPeriod: parsedData.education?.period || '',
          educationLocation: parsedData.education?.location || '',
          orgName: parsedData.organization?.name || '',
          orgInstitution: parsedData.organization?.institution || '',
          orgPeriod: parsedData.organization?.period || '',
          orgActivities: Array.isArray(parsedData.organization?.activities)
            ? parsedData.organization.activities.join('\n')
            : parsedData.organization?.activities || '',
          programming: parsedData.skills?.programming?.join(', ') || '',
          database: parsedData.skills?.database?.join(', ') || '',
          others: parsedData.skills?.others?.join(', ') || '',
        }
        
        form.setFieldsValue(formData)
        setCvData(parsedData)
      } catch (error) {
        console.error('Error loading saved CV data:', error)
      }
    }
    setIsLoaded(true)
  }, [form])

  // Save data to localStorage
  const saveToLocalStorage = (data: CVData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Error saving CV data to localStorage:', error)
    }
  }

  const handleFinish = (values: any) => {
    const data: CVData = {
      personalInfo: {
        name: values.name || '',
        phone: values.phone || '',
        email: values.email || '',
        linkedin: values.linkedin || '',
      },
      profile: values.profile || '',
      projects: (values.projects || []).map((project: any) => ({
        ...project,
        achievements: project.achievements 
          ? (typeof project.achievements === 'string' 
              ? project.achievements.split('\n').filter((line: string) => line.trim())
              : Array.isArray(project.achievements) 
                ? project.achievements 
                : [])
          : [],
      })),
      education: {
        degree: values.degree || '',
        institution: values.institution || '',
        period: values.educationPeriod || '',
        location: values.educationLocation || '',
      },
      organization: {
        name: values.orgName || '',
        institution: values.orgInstitution || '',
        period: values.orgPeriod || '',
        activities: values.orgActivities 
          ? (typeof values.orgActivities === 'string' 
              ? values.orgActivities.split('\n').filter((line: string) => line.trim())
              : Array.isArray(values.orgActivities) 
                ? values.orgActivities 
                : [])
          : [],
      },
      skills: {
        programming: values.programming ? values.programming.split(',').map((s: string) => s.trim()) : [],
        database: values.database ? values.database.split(',').map((s: string) => s.trim()) : [],
        others: values.others ? values.others.split(',').map((s: string) => s.trim()) : [],
      },
    }
    setCvData(data)
    
    // Save to localStorage
    saveToLocalStorage(data)
    
    // Download CV
    downloadCV(data, `${values.name || 'cv'}.md`)
  }

  // Auto-save on form change (optional, debounced)
  const handleValuesChange = () => {
    if (!isLoaded) return
    
    const currentValues = form.getFieldsValue()
    const transformedData: CVData = {
      personalInfo: {
        name: currentValues.name || '',
        phone: currentValues.phone || '',
        email: currentValues.email || '',
        linkedin: currentValues.linkedin || '',
      },
      profile: currentValues.profile || '',
      projects: (currentValues.projects || []).map((project: any) => ({
        ...project,
        achievements: project.achievements 
          ? (typeof project.achievements === 'string' 
              ? project.achievements.split('\n').filter((line: string) => line.trim())
              : Array.isArray(project.achievements) 
                ? project.achievements 
                : [])
          : [],
      })),
      education: {
        degree: currentValues.degree || '',
        institution: currentValues.institution || '',
        period: currentValues.educationPeriod || '',
        location: currentValues.educationLocation || '',
      },
      organization: {
        name: currentValues.orgName || '',
        institution: currentValues.orgInstitution || '',
        period: currentValues.orgPeriod || '',
        activities: currentValues.orgActivities 
          ? (typeof currentValues.orgActivities === 'string' 
              ? currentValues.orgActivities.split('\n').filter((line: string) => line.trim())
              : Array.isArray(currentValues.orgActivities) 
                ? currentValues.orgActivities 
                : [])
          : [],
      },
      skills: {
        programming: currentValues.programming ? currentValues.programming.split(',').map((s: string) => s.trim()) : [],
        database: currentValues.database ? currentValues.database.split(',').map((s: string) => s.trim()) : [],
        others: currentValues.others ? currentValues.others.split(',').map((s: string) => s.trim()) : [],
      },
    }
    
    saveToLocalStorage(transformedData)
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-8 fade-in">
        <Title level={1} className="!m-0 text-white text-4xl md:text-3xl font-bold mb-4">
          CV Maker
        </Title>
        <Title level={4} className="!m-0 text-white/60 text-lg md:text-base font-normal">
          Create and customize your professional CV easily
        </Title>
      </div>

      <Card className="rounded-[20px] p-8 md:p-6 glass">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          onValuesChange={handleValuesChange}
          className="space-y-6"
        >
          {/* Personal Information */}
          <div className="fade-in">
            <Title level={3} className="!mb-4 text-white text-2xl font-semibold">Personal Information</Title>
            <Divider className="!border-white/10 !my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="name"
                label={<Text className="text-white/80">Full Name</Text>}
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input 
                  size="large" 
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="Sabiq Muhammad Antebing Mame"
                />
              </Form.Item>
              <Form.Item
                name="phone"
                label={<Text className="text-white/80">Phone</Text>}
              >
                <Input 
                  size="large" 
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="(+62) 85691550726"
                />
              </Form.Item>
              <Form.Item
                name="email"
                label={<Text className="text-white/80">Email</Text>}
                rules={[{ required: true, message: 'Please enter your email' }, { type: 'email' }]}
              >
                <Input 
                  size="large" 
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="sabiqmuhammad98@gmail.com"
                />
              </Form.Item>
              <Form.Item
                name="linkedin"
                label={<Text className="text-white/80">LinkedIn URL</Text>}
              >
                <Input 
                  size="large" 
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="https://www.linkedin.com/in/your-profile"
                />
              </Form.Item>
            </div>
          </div>

          {/* Profile */}
          <div className="fade-in">
            <Title level={3} className="!mb-4 text-white text-2xl font-semibold">Profile</Title>
            <Divider className="!border-white/10 !my-4" />
            <Form.Item
              name="profile"
              label={<Text className="text-white/80">Profile Description</Text>}
            >
              <TextArea
                rows={5}
                className="bg-white/5 border-white/20 text-white"
                placeholder="Full-Stack Developer with expertise in website and backend development..."
              />
            </Form.Item>
          </div>

          {/* Projects */}
          <div className="fade-in">
            <Title level={3} className="!mb-4 text-white text-2xl font-semibold">Projects</Title>
            <Divider className="!border-white/10 !my-4" />
            <Form.List name="projects">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Card
                      key={key}
                      className="mb-4 rounded-2xl glass-soft border-white/10"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <Title level={4} className="!m-0 text-white">Project {name + 1}</Title>
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => remove(name)}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                          {...restField}
                          name={[name, 'title']}
                          label={<Text className="text-white/80">Project Title</Text>}
                        >
                          <Input 
                            className="bg-white/5 border-white/20 text-white"
                            placeholder="BSMR (Badan Sertifikasi Manajemen Risiko)"
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'company']}
                          label={<Text className="text-white/80">Company</Text>}
                        >
                          <Input 
                            className="bg-white/5 border-white/20 text-white"
                            placeholder="PT. Quantum Teknologi Nusantara"
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'period']}
                          label={<Text className="text-white/80">Period</Text>}
                          className="md:col-span-2"
                        >
                          <Input 
                            className="bg-white/5 border-white/20 text-white"
                            placeholder="Jan 2022 - Now"
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'description']}
                          label={<Text className="text-white/80">Description</Text>}
                          className="md:col-span-2"
                        >
                          <TextArea
                            rows={3}
                            className="bg-white/5 border-white/20 text-white"
                            placeholder="Web-based certification system for training providers..."
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'achievements']}
                          label={<Text className="text-white/80">Achievements (one per line)</Text>}
                          className="md:col-span-2"
                          getValueFromEvent={(e) => e.target.value}
                          normalize={(value) => value}
                        >
                          <TextArea
                            rows={5}
                            className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
                            placeholder="Developed a centralized logging system...&#10;Deployed staging and production environments..."
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'availableOn']}
                          label={<Text className="text-white/80">Available On (optional)</Text>}
                          className="md:col-span-2"
                        >
                          <Input 
                            className="bg-white/5 border-white/20 text-white"
                            placeholder="Available on: App Store & Play Store"
                          />
                        </Form.Item>
                      </div>
                    </Card>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    className="border-primary-blue/50 text-primary-blue-light hover:border-primary-blue"
                  >
                    Add Project
                  </Button>
                </>
              )}
            </Form.List>
          </div>

          {/* Education */}
          <div className="fade-in">
            <Title level={3} className="!mb-4 text-white text-2xl font-semibold">Education</Title>
            <Divider className="!border-white/10 !my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="degree"
                label={<Text className="text-white/80">Degree</Text>}
              >
                <Input 
                  size="large" 
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="Bachelor of Computer Science"
                />
              </Form.Item>
              <Form.Item
                name="institution"
                label={<Text className="text-white/80">Institution</Text>}
              >
                <Input 
                  size="large" 
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="Sekolah Tinggi Teknologi Terpadu Nurul Fikri"
                />
              </Form.Item>
              <Form.Item
                name="educationPeriod"
                label={<Text className="text-white/80">Period</Text>}
              >
                <Input 
                  size="large" 
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="Sept 2020 – Sept 2024"
                />
              </Form.Item>
              <Form.Item
                name="educationLocation"
                label={<Text className="text-white/80">Location</Text>}
              >
                <Input 
                  size="large" 
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="Jakarta, Indonesia"
                />
              </Form.Item>
            </div>
          </div>

          {/* Organization */}
          <div className="fade-in">
            <Title level={3} className="!mb-4 text-white text-2xl font-semibold">Organization Experience</Title>
            <Divider className="!border-white/10 !my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="orgName"
                label={<Text className="text-white/80">Organization Name</Text>}
              >
                <Input 
                  size="large" 
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="Google Developer Student Club (GDSC)"
                />
              </Form.Item>
              <Form.Item
                name="orgInstitution"
                label={<Text className="text-white/80">Institution</Text>}
              >
                <Input 
                  size="large" 
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="STT Terpadu Nurul Fikri"
                />
              </Form.Item>
              <Form.Item
                name="orgPeriod"
                label={<Text className="text-white/80">Period</Text>}
                className="md:col-span-2"
              >
                <Input 
                  size="large" 
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="Dec 2022 – Aug 2023"
                />
              </Form.Item>
              <Form.Item
                name="orgActivities"
                label={<Text className="text-white/80">Activities (one per line)</Text>}
                className="md:col-span-2"
                getValueFromEvent={(e) => e.target.value}
                normalize={(value) => value}
              >
                <TextArea
                  rows={4}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
                  placeholder="Organized and managed frontend team members...&#10;Led a 3-month bootcamp as an instructor..."
                />
              </Form.Item>
            </div>
          </div>

          {/* Skills */}
          <div className="fade-in">
            <Title level={3} className="!mb-4 text-white text-2xl font-semibold">Skills</Title>
            <Divider className="!border-white/10 !my-4" />
            <Form.Item
              name="programming"
              label={<Text className="text-white/80">Programming Languages (comma separated)</Text>}
            >
              <Input 
                size="large" 
                className="bg-white/5 border-white/20 text-white"
                placeholder="TypeScript, Flutter, Python, NextJS, ReactJS, VueJS, ExpressJS, NestJS"
              />
            </Form.Item>
            <Form.Item
              name="database"
              label={<Text className="text-white/80">Database (comma separated)</Text>}
            >
              <Input 
                size="large" 
                className="bg-white/5 border-white/20 text-white"
                placeholder="MySQL, Elasticsearch"
              />
            </Form.Item>
            <Form.Item
              name="others"
              label={<Text className="text-white/80">Others (comma separated)</Text>}
            >
              <Input 
                size="large" 
                className="bg-white/5 border-white/20 text-white"
                placeholder="Docker, AWS, GitHub, Figma"
              />
            </Form.Item>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              icon={<DownloadOutlined />}
              className="h-12 px-12 text-base font-medium bg-gradient-blue border-0 shadow-blue hover:-translate-y-0.5 hover:shadow-blue-hover transition-all"
            >
              Generate & Download CV
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}
