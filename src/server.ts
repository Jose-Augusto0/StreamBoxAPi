import './infra/observability/tracing';
import { AppDataSource } from './infra/db/data-source'
import { app } from './app'

async function bootstrap() {
  try {
    await AppDataSource.initialize()
    console.log('Database conectado')

    await app.ready()

    console.log(app.printRoutes())

    app.listen({ port: 3333 }, () => {
      app.log.info('Servidor rodando na porta 3333');
    });

    console.log('Servidor rodando em http://localhost:3333')
  } catch (err) {
    console.error('Erro ao iniciar servidor:', err)
    process.exit(1)
  }
}

bootstrap()
