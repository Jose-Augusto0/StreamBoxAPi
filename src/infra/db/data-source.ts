import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../../modules/user/user.entity'
import { Content } from '../../modules/content/content.entity'
import { Playback } from '../../modules/playback/playback.entity'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'streambox_app',
  password: 'streambox123',
  database: 'streambox',
  synchronize: true,
  logging: false,
  entities: [User, Content, Playback]
})
