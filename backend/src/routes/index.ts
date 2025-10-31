import { FastifyInstance } from 'fastify'
import healthRoutes from './health.routes'

export async function registerRoutes(fastify: FastifyInstance) {
  // Health check routes
  await fastify.register(healthRoutes)

  // Add more route modules here
  // await fastify.register(userRoutes)
  // await fastify.register(toolsRoutes)
}
