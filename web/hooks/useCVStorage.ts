import { useState, useEffect } from 'react'
import { CVData, defaultCVData } from '@/data/cv-maker.data'

const STORAGE_KEY = 'cv-maker-data'

export function useCVStorage() {
  const [cvData, setCvData] = useState<CVData>(defaultCVData)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Ensure this only runs on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load data from localStorage on mount
  useEffect(() => {
    if (!isClient) return

    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setCvData(parsedData)
      } catch (error) {
        console.error('Error loading saved CV data:', error)
      }
    }
    setIsLoaded(true)
  }, [isClient])

  // Save data to localStorage
  const saveToLocalStorage = (data: CVData) => {
    if (!isClient) return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      setCvData(data)
    } catch (error) {
      console.error('Error saving CV data to localStorage:', error)
    }
  }

  return {
    cvData,
    setCvData,
    saveToLocalStorage,
    isLoaded,
    isClient,
  }
}

