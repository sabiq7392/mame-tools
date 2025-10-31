import { FastifyRequest, FastifyReply } from 'fastify'
import { ApiResponse, HealthResponse } from '../types'

class HealthController {
  getHealth = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ApiResponse<HealthResponse>> => {
    const uptime = process.uptime()
    
    return {
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: Math.floor(uptime),
      },
      message: 'Server is healthy',
    }
  }
}

export const healthController = new HealthController()
