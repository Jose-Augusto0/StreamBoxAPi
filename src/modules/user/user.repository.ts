import { AppDataSource } from '../../infra/db/data-source'
import { User } from './user.entity'

export const userRepository = AppDataSource.getRepository(User)
