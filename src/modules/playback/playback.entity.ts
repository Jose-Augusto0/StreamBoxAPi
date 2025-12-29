import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { Content } from '../content/content.entity'
import { User } from '../user/user.entity'


@Entity('playbacks')
export class Playback {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user!: User

  @ManyToOne(() => Content, { nullable: false })
  @JoinColumn({ name: 'contentId' })
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
