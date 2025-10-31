import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ApiResponse } from '../types'

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const statusCode = error.statusCode || 500
  const message = error.message || 'Internal Server Error'

  request.log.error(error)

  const isDevelopment = process.env.NODE_ENV === 'development'
  const response: ApiResponse = {
    success: false,
    error: error.name || 'Error',
    message: isDevelopment ? message : 'Internal Server Error',
  }

  reply.code(statusCode).send(response)
}
