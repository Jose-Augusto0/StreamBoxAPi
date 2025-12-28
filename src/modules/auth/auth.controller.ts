import { FastifyRequest, FastifyReply } from 'fastify'
import { AuthService } from './auth.service'

const authService = new AuthService()

export class AuthController {
  register = async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, email, password } = request.body as any
    const user = await authService.register(name, email, password)
    return reply.status(201).send(user)
  }

  login = async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as any
    const token = await authService.login(email, password)
    return reply.send(token)
  }
}

