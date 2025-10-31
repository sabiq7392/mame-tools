import Fastify from 'fastify'
import { config } from './config/env'
import { loggerConfig } from './utils/logger'
import { registerRoutes } from './routes'
import { registerCors } from './plugins/cors.plugin'
import { notFoundHandler } from './middlewares/notFound.middleware'
import { errorHandler } from './middlewares/errorHandler.middleware'
import { indexController } from './controllers/index.controller'

const fastify = Fastify({
  logger: loggerConfig,
})

// Declare types for Fastify instance
declare module 'fastify' {
  interface FastifyInstance {
    config: typeof config
  }
}

// Attach config to fastify instance
fastify.decorate('config', config)

// Register plugins
await fastify.register(registerCors)

// Register routes
await fastify.register(registerRoutes)

// Root route
fastify.get('/', indexController.getIndex)

// Register error handlers
fastify.setErrorHandler(errorHandler)
fastify.setNotFoundHandler(notFoundHandler)

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: config.port, host: config.host })
    fastify.log.info(`🚀 Server running on http://${config.host}:${config.port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
