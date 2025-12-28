import { FastifyRequest, FastifyReply } from 'fastify'
import { AuthService } from './auth.service'

const authService = new AuthService()

export class AuthController {
  register = async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, email, password } = request.body as any

    request.server.log.info(
      { route: '/auth/register', method: 'POST', body: { name, email } },
      'A rota de registro foi chamada'
    )

    const user = await authService.register(name, email, password)

    return reply.status(201).send(user)
  }

  login = async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as any
    
    request.server.log.info(
      { route: '/auth/login', method: 'POST', body: { email } },
      'A rota de login foi chamada'
    )

    const token = await authService.login(email, password)

    return reply.send(token)
  }
}

