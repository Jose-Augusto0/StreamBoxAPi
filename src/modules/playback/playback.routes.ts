import { FastifyInstance } from 'fastify'
import { PlaybackController } from './playback.controller'

export async function playbackRoutes(fastify: FastifyInstance) {
  const controller = new PlaybackController()

  fastify.post('/start', controller.start.bind(controller))
  fastify.patch('/update', controller.update.bind(controller))
  fastify.get('/get', controller.get.bind(controller))
}
