import fastify from 'fastify'
import { env } from './env'
import { transacrtionsRoutes } from './routes/transaction'

const app = fastify()

app.register(transacrtionsRoutes, {
  prefix: 'transactions',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Http server listening on port 3333')
  })
