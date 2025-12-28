import { AppDataSource } from './infra/db/data-source'
import { app } from './app'

async function bootstrap() {
  try {
    await AppDataSource.initialize()
    console.log('📦 Database connected')

       await app.ready() 

    console.log(app.printRoutes()) 

    await app.listen({
      port: 3333,
      host: '0.0.0.0'
    })

    console.log('🚀 Server running on http://localhost:3333')
  } catch (err) {
    console.error('❌ Error starting server:', err)
    process.exit(1)
  }
}

bootstrap()
