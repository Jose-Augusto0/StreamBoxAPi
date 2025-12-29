import { AppDataSource } from '../../infra/db/data-source'
import { Playback } from './playback.entity'
import { User } from '../user/user.entity'
import { Content } from '../content/content.entity'
import { trace } from '@opentelemetry/api'

export class PlaybackService {
  private playbackRepo = AppDataSource.getRepository(Playback)
  private userRepo = AppDataSource.getRepository(User)
  private contentRepo = AppDataSource.getRepository(Content)

  async createPlayback(userId: number, contentId: number) {
    const tracer = trace.getTracer('playback-service')

    return tracer.startActiveSpan('create-playback', async (span) => {
      try {
        const user = await this.userRepo.findOneBy({ id: userId })
        const content = await this.contentRepo.findOneBy({ id: contentId })
        if (!user || !content) throw new Error('Usuário ou conteúdo não encontrado')

        const playback = this.playbackRepo.create({
          user,
          content,
          progress: 0,
          status: 'playing'
        })

        const savedPlayback = await this.playbackRepo.save(playback)

        span.setStatus({ code: 1 })


        return savedPlayback
      } catch (err: any) {
        span.recordException(err)
        span.setStatus({ code: 2, message: err.message })
        throw err
      } finally {
        span.end()
      }
    })
  }

  async updatePlayback(playbackId: number, progress: number, status: 'playing' | 'paused' | 'finished') {
    const tracer = trace.getTracer('playback-service')

    return tracer.startActiveSpan('update-playback', async (span) => {
      try {
        const playback = await this.playbackRepo.findOne({
          where: { id: playbackId },
          relations: ['user', 'content']
        })
        if (!playback) throw new Error('Reprodução não encontrada')

        playback.progress = progress
        playback.status = status

        const savedPlayback = await this.playbackRepo.save(playback)

        span.setStatus({ code: 1 })

        return savedPlayback
      } catch (err: any) {
        span.recordException(err)
        span.setStatus({ code: 2, message: err.message })
        throw err
      } finally {
        span.end()
      }
    })
  }

  async getPlayback(userId: number, contentId: number) {
    return await this.playbackRepo.findOne({
      where: {
        user: { id: userId },
        content: { id: contentId }
      },
      relations: ['user', 'content']
    })
  }
}
