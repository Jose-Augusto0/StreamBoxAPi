import { FastifyRequest, FastifyReply } from 'fastify'
import { PlaybackService } from './playback.service'

const playbackService = new PlaybackService()

export class PlaybackController {
  async start(req: FastifyRequest, reply: FastifyReply) {
    const { userId, contentId } = req.body as { userId: number; contentId: number }
    try {
      const playback = await playbackService.createPlayback(userId, contentId)
      reply.send(playback)
    } catch (err: any) {
      reply.status(400).send({ message: err.message })
    }
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const { playbackId, progress, status } = req.body as { playbackId: number; progress: number; status: 'playing' | 'paused' | 'finished' }
    try {
      const playback = await playbackService.updatePlayback(playbackId, progress, status)
      reply.send(playback)
    } catch (err: any) {
      reply.status(400).send({ message: err.message })
    }
  }

  async get(req: FastifyRequest, reply: FastifyReply) {
    const { userId, contentId } = req.query as { userId: number; contentId: number }
    try {
      const playback = await playbackService.getPlayback(userId, contentId)
      reply.send(playback)
    } catch (err: any) {
      reply.status(400).send({ message: err.message })
    }
  }
}
