import fastify from 'fastify'
import { knex } from './database'
// import crypto from 'node:crypto'

const app = fastify()

app.get('/hello', async () => {
  const transactions = await knex('transactions')
    .where('id', '0adb9482-0f0c-46a0-9dac-6628a707f9cd')
    .select('*')

  return transactions
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Http server listening on port 3333')
  })
