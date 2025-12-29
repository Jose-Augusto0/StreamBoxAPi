import Fastify from 'fastify'
import authRoutes from './modules/auth/auth.routes'
import { playbackRoutes } from './modules/playback/playback.routes'

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

app.register(playbackRoutes, { prefix: '/playback' })

