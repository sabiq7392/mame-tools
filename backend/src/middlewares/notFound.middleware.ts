import { FastifyRequest, FastifyReply } from 'fastify'

export function notFoundHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  reply.code(404).send({
    success: false,
    error: 'Not Found',
    message: `Route ${request.method} ${request.url} not found`,
  })
}
