import 'dotenv/config'
import express, { Request, Response } from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { trpcRouter } from 'trpc'
import cors from 'cors'

const expressApp = express()
expressApp.use(cors())
expressApp.get('/ping', (req: Request, res: Response) => {
  res.status(200).send('pong')
})

expressApp.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
  })
)

// Запуск сервера
const PORT = process.env.PORT || 3000
expressApp.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`)
})
