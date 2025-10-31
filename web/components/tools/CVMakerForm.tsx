'use client'

import { useState, useEffect } from 'react'
import { Card, Typography, Form, Button } from 'antd'
import { DownloadOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons'
import { useCVStorage } from '@/hooks/useCVStorage'
import { transformFormValuesToCVData, transformCVDataToFormValues } from '@/utils/cv-form-transformer'
import { downloadCV } from '@/utils/cv-generator'
import CVPreview from './CVPreview'
import PersonalInfoSection from './form-sections/PersonalInfoSection'
import ProfileSection from './form-sections/ProfileSection'
import ProjectsSection from './form-sections/ProjectsSection'
import EducationSection from './form-sections/EducationSection'
import OrganizationSection from './form-sections/OrganizationSection'
import SkillsSection from './form-sections/SkillsSection'

const { Title, Text } = Typography

export default function CVMakerForm() {
  const [form] = Form.useForm()
  const [isFormVisible, setIsFormVisible] = useState(false)
  const { cvData, setCvData, saveToLocalStorage, isLoaded, isClient } = useCVStorage()

  // Load saved data into form on mount
  useEffect(() => {
    if (!isClient || !isLoaded) return

    const formValues = transformCVDataToFormValues(cvData)
    form.setFieldsValue(formValues)
  }, [form, cvData, isClient, isLoaded])

  // Auto-save on form change and update preview
  const handleValuesChange = () => {
    if (!isLoaded || !isClient) return

    const currentValues = form.getFieldsValue()
    const transformedData = transformFormValuesToCVData(currentValues)

    setCvData(transformedData)
    saveToLocalStorage(transformedData)
  }

  const handleFinish = (values: any) => {
    const data = transformFormValuesToCVData(values)

    setCvData(data)
    saveToLocalStorage(data)
    downloadCV(data, `${values.name || 'cv'}.md`)
  }

  // Prevent hydration mismatch by not rendering form until client-side
  if (!isClient) {
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
          <div className="flex justify-center items-center py-20">
            <Text className="text-white/60">Loading...</Text>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-[1800px] mx-auto relative">
      <div className="mb-8 fade-in">
        <Title level={1} className="!m-0 text-white text-4xl md:text-3xl font-bold mb-4">
          CV Maker
        </Title>
        <Title level={4} className="!m-0 text-white/60 text-lg md:text-base font-normal">
          Create and customize your professional CV easily
        </Title>
      </div>

      {/* Preview - Left Side */}
      <div className="max-w-4xl mx-auto">
        <CVPreview cvData={cvData} />
      </div>

      {/* Floating Toggle Button */}
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={isFormVisible ? <CloseOutlined /> : <EditOutlined />}
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="fixed bottom-8 right-8 z-[1100] h-14 w-14 shadow-lg bg-gradient-blue border-0 hover:scale-110 transition-all"
      />

      {/* Floating Form - Right Side */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[600px] lg:w-[700px] transform transition-transform duration-300 ease-in-out z-[1100] ${
          isFormVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto bg-gradient-dark p-6 border-l border-white/10">
          <Card className="rounded-[20px] p-8 md:p-6 glass border-none">
            <div className="flex justify-between items-center mb-6">
              <Title level={3} className="!m-0 text-white text-2xl font-semibold">
                Edit CV
              </Title>
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => setIsFormVisible(false)}
                className="!text-white/70 hover:!text-white"
              />
            </div>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              onValuesChange={handleValuesChange}
              className="space-y-6"
            >
              <PersonalInfoSection />
              <ProfileSection />
              <ProjectsSection />
              <EducationSection />
              <OrganizationSection />
              <SkillsSection />

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
      </div>

      {/* Backdrop when form is visible */}
      {isFormVisible && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1050]"
          onClick={() => setIsFormVisible(false)}
        />
      )}
    </div>
  )
}
