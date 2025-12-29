import { DataSource } from 'typeorm'
import { User } from '../../modules/user/user.entity'
import { Content } from '../../modules/content/content.entity'
import { Playback } from '../../modules/playback/playback.entity'
import 'dotenv/config'
import 'reflect-metadata'


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/../../modules/**/**/*.entity.{js,ts}']
})
