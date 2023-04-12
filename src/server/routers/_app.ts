import { router, procedure } from '../trpc'
import { z } from 'zod'

export const appRouter = router({
    hello: procedure.input(z.object({
        name: z.string()
    })).query((req) => {
        const { input } = req
        return {
            greeting: `Hello, ${input.name}`
        }
    })
})

export type AppRouter = typeof appRouter