import { FastifyPluginAsync } from 'fastify'
import { healthController } from '../controllers/health.controller'

const healthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/health', healthController.getHealth)
}

export default healthRoutes
