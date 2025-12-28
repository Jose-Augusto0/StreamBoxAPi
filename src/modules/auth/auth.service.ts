import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AppDataSource } from '../../infra/db/data-source'
import { User } from '../user/user.entity'

const userRepository = AppDataSource.getRepository(User)

export class AuthService {
  async register(name: string, email: string, password: string) {
    const userExists = await userRepository.findOne({ where: { email } })

    if (userExists) {
      throw new Error('O usuário já existe')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    })

    await userRepository.save(user)

    return { id: user.id, name: user.name, email: user.email }
  }

  async login(email: string, password: string) {
    const user = await userRepository.findOne({ where: { email } })

    if (!user) {
      throw new Error('Credencias invalidas')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Credencias invalidas')
    }

    const token = jwt.sign(
      { sub: user.id },
      process.env.JWT_SECRET || 'streambox-secret',
      { expiresIn: '1d' }
    )

    return { token }
  }
}
