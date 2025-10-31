import { FastifyLoggerOptions } from 'fastify'

const isDevelopment = process.env.NODE_ENV === 'development'

export const loggerConfig: FastifyLoggerOptions = {
  level: process.env.LOG_LEVEL || 'info',
  ...(isDevelopment && {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  }),
} as FastifyLoggerOptions
