export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface HealthResponse {
  status: 'healthy' | 'unhealthy'
  timestamp: string
  uptime: number
}
