import 'dotenv/config'
import express, { Request, Response } from 'express'
import { trpcRouter } from './router'
import cors from 'cors'
import { applyTrpcToExpressApp } from 'lib/trpc'

const expressApp = express()
expressApp.use(cors())
expressApp.get('/ping', (req: Request, res: Response) => {
  res.status(200).send('pong')
})

applyTrpcToExpressApp(expressApp, trpcRouter)

// Запуск сервера
const PORT = process.env.PORT || 3000
expressApp.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`)
})
