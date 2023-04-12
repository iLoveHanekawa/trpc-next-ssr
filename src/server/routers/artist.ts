import { router, procedure } from "../trpc";
import { z } from 'zod'

export const artistRouter = router({
    findmany: procedure.query(async (req) => {
        const res = await fetch('http://localhost:4000/artists')
        const artists = await res.json()
        return {
            artists
        }
    }),
    findone: procedure.input(z.object({
        id: z.number()
    })).query(async(req) => {
        const { input } = req
        const res = await fetch(`http://localhost:4000/${input.id}`)
        const artist = await res.json()
        return {
            artist
        }
    })
})