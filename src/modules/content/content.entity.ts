import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('contents')
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  title!: string

  @Column()
  description!: string

  @Column()
  type!: string // movie | series

  @Column()
  duration!: number
}
