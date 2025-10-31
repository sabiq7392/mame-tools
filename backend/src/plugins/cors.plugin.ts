import { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'

export async function registerCors(fastify: FastifyInstance) {
  await fastify.register(cors, {
    origin: true,
    credentials: true,
  })
}
