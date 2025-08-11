import { createTRPCReact } from '@trpc/react-query'
import type { TrpcRouter } from '@ideanick/backend/src/router'

export const trpc = createTRPCReact<TrpcRouter>()
