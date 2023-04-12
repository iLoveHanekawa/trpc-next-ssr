import { router, procedure } from '../trpc'
import { z } from 'zod'
import { artistRouter } from './artist'

export const appRouter = router({
    hello: procedure.input(z.object({
        name: z.string()
    })).query((req) => {
        const { input } = req
        return {
            greeting: `Hello, ${input.name}`
        }
    }),
    artist: artistRouter
})

export type AppRouter = typeof appRouter