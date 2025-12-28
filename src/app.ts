import Fastify from 'fastify'
import authRoutes from './modules/auth/auth.routes'

export const app = Fastify({ logger: true })

app.register(authRoutes, { prefix: '/auth' })

