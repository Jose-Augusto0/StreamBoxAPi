import { AppDataSource } from '../../infra/db/data-source'
import { Playback } from './playback.entity'
import { User } from '../user/user.entity'
import { Content } from '../content/content.entity'

export class PlaybackService {
  private playbackRepo = AppDataSource.getRepository(Playback)
  private userRepo = AppDataSource.getRepository(User)
  private contentRepo = AppDataSource.getRepository(Content)

  async createPlayback(userId: string, contentId: string) {
    const user = await this.userRepo.findOneBy({ id: userId })
    const content = await this.contentRepo.findOneBy({ id: contentId })

    if (!user || !content) throw new Error('Usuário ou conteúdo não encontrado')

    const playback = this.playbackRepo.create({
      user,
      content,
      progress: 0,
      status: 'playing'
    })

    return await this.playbackRepo.save(playback)
  }

  async updatePlayback(playbackId: string, progress: number, status: 'playing' | 'paused' | 'finished') {
    const playback = await this.playbackRepo.findOneBy({ id: playbackId })
    if (!playback) throw new Error('Reprodução não encontrada')

    playback.progress = progress
    playback.status = status

    return await this.playbackRepo.save(playback)
  }

  async getPlayback(userId: string, contentId: string) {
    return await this.playbackRepo.findOne({
      where: {
        user: { id: userId },
        content: { id: contentId }
      },
      relations: ['user', 'content']
    })
  }
}
