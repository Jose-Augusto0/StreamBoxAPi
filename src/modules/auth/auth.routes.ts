import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { AuthController } from './auth.controller'

const controller = new AuthController()

async function authRoutes(app: FastifyInstance) {
  app.post('/register', controller.register)
  app.post('/login', controller.login)
}

export default fp(authRoutes)
