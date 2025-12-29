import { FastifyInstance } from 'fastify'
import { PlaybackController } from './playback.controller'

export async function playbackRoutes(fastify: FastifyInstance) {
  const controller = new PlaybackController()

  fastify.post('/playback/start', controller.start.bind(controller))
  fastify.patch('/playback/update', controller.update.bind(controller))
  fastify.get('/playback/get', controller.get.bind(controller))
}
