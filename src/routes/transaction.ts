import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function transacrtionsRoutes(app: FastifyInstance) {
  app.post('/', async (req, res) => {
    const creactTransactionsBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = creactTransactionsBodySchema.parse(req.body)

    try {
      await knex('transactions').insert({
        id: randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1,
      })
    } catch {
      return res.status(500).send('Internal server error')
    }
    return res.status(201).send()
  })

  app.get('/', async (_, res) => {
    try {
      const transactions = await knex('transactions').select('*')
      return transactions
    } catch {
      return res.status(500).send('Internal server error')
    }
  })
}
