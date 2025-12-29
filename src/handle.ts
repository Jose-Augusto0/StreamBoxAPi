import fastify from 'fastify'
import 'dotenv/config'
import awsLambdaFastify from '@fastify/aws-lambda'
import authRoutes from './modules/auth/auth.routes'
import { playbackRoutes } from './modules/playback/playback.routes'


const app = fastify()

app.get('/health', async () => {
  return { status: 'ok' }
})

app.register(authRoutes, { prefix: '/auth' })
app.register(playbackRoutes)

const proxy = awsLambdaFastify(app, {
  binaryMimeTypes: ['application/json']
})

export const handler = proxy
