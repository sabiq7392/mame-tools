import { FastifyRequest, FastifyReply } from 'fastify'
import { ApiResponse } from '../types'

class IndexController {
  getIndex = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ApiResponse> => {
    return {
      success: true,
      data: {
        name: 'Mame Tools API',
        version: '0.1.0',
        status: 'ok',
      },
      message: 'Welcome to Mame Tools API',
    }
  }
}

export const indexController = new IndexController()
