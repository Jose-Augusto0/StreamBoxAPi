import fastify from 'fastify'
import awsLambdaFastify from '@fastify/aws-lambda'

const app = fastify()

app.get('/health', async () => {
  return { status: 'ok' }
})

const proxy = awsLambdaFastify(app)

export const handler = proxy
