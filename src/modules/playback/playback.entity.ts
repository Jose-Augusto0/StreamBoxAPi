import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'
import { Content } from '../content/content.entity'
import { User } from '../user/user.entity'


@Entity('playbacks')
export class Playback {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => User)
  user!: User

  @ManyToOne(() => Content)
  content!: Content

  @Column({ default: 0 })
  progress!: number 

  @Column({ default: 'playing' })
  status!: 'playing' | 'paused' | 'finished'

  @CreateDateColumn()
  startedAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
