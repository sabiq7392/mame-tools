import { CVData } from '@/data/cv-maker.data'

export function generateCVMarkdown(data: CVData): string {
  let markdown = `# ${data.personalInfo.name}\n\n`
  
  // Contact Information
  markdown += `**Contact Information**\n`
  markdown += `- Phone: ${data.personalInfo.phone}\n`
  markdown += `- Email: ${data.personalInfo.email}\n`
  markdown += `- LinkedIn: [${data.personalInfo.linkedin}](${data.personalInfo.linkedin})\n\n`
  
  // Profile
  if (data.profile) {
    markdown += `## PROFILE\n\n${data.profile}\n\n`
  }
  
  // Projects
  if (data.projects.length > 0) {
    markdown += `## PROJECTS\n\n`
    
    // Get unique companies and group projects
    const companyProjects = data.projects.reduce((acc, project) => {
      if (!acc[project.company]) {
        acc[project.company] = []
      }
      acc[project.company].push(project)
      return acc
    }, {} as Record<string, typeof data.projects>)
    
    Object.entries(companyProjects).forEach(([company, projects]) => {
      const firstProject = projects[0]
      markdown += `**${company}** | *${firstProject.period}*\n\n`
      
      projects.forEach((project, index) => {
        markdown += `### ${index + 1}. ${project.title}\n\n`
        markdown += `${project.description}\n\n`
        
        if (project.achievements && project.achievements.length > 0) {
          const achievements = Array.isArray(project.achievements) 
            ? project.achievements 
            : typeof project.achievements === 'string' 
              ? project.achievements.split('\n').filter(line => line.trim())
              : []
          
          achievements.forEach(achievement => {
            const trimmed = achievement.trim()
            if (trimmed) {
              markdown += `- ${trimmed}\n`
            }
          })
          markdown += `\n`
        }
        
        if (project.availableOn) {
          markdown += `*${project.availableOn}*\n\n`
        }
      })
    })
  }
  
  // Education
  if (data.education.degree) {
    markdown += `## EDUCATION\n\n`
    markdown += `**${data.education.degree}**\n`
    markdown += `*${data.education.period}*\n\n`
    markdown += `${data.education.institution}\n`
    markdown += `${data.education.location}\n\n`
  }
  
  // Organization
  if (data.organization.name) {
    markdown += `## ORGANIZATION EXPERIENCE\n\n`
    markdown += `**${data.organization.name}** | *${data.organization.period}*\n`
    markdown += `${data.organization.institution}\n\n`
    
    const activities = Array.isArray(data.organization.activities)
      ? data.organization.activities
      : typeof data.organization.activities === 'string'
        ? data.organization.activities.split('\n').filter(line => line.trim())
        : []
    
    activities.forEach(activity => {
      const trimmed = activity.trim()
      if (trimmed) {
        markdown += `- ${trimmed}\n`
      }
    })
    markdown += `\n`
  }
  
  // Skills
  const hasSkills = data.skills.programming.length > 0 || 
                   data.skills.database.length > 0 || 
                   data.skills.others.length > 0
  
  if (hasSkills) {
    markdown += `## ADDITIONAL EXPERIENCE\n\n`
    
    if (data.skills.programming.length > 0) {
      markdown += `### Programming Language\n`
      markdown += `Experienced in using ${data.skills.programming.join(', ')}\n\n`
    }
    
    if (data.skills.database.length > 0) {
      markdown += `### Database\n`
      markdown += `Experienced in using ${data.skills.database.join(', ')}\n\n`
    }
    
    if (data.skills.others.length > 0) {
      markdown += `### Others\n`
      markdown += `Experienced in using ${data.skills.others.join(', ')}\n\n`
    }
  }
  
  return markdown
}

export function downloadCV(data: CVData, filename: string = 'cv.md') {
  const markdown = generateCVMarkdown(data)
  const blob = new Blob([markdown], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
