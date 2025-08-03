import { createTRPCReact } from '@trpc/react-query'
import type { TrpcRouter } from '@ideanick/backend/src/trpc'

export const trpc = createTRPCReact<TrpcRouter>()
