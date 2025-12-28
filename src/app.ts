import Fastify from 'fastify'
import authRoutes from './modules/auth/auth.routes'

export const app = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty', 
      options: {
        colorize: true,
      },
    },
  },
});

app.register(authRoutes, { prefix: '/auth' })

