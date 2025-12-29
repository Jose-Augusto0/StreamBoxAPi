import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('contents')
export class Content {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column()
  description!: string

  @Column()
  type!: string 

  @Column()
  duration!: number
}
