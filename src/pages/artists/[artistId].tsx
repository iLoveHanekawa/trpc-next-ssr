import { createServerSideHelpers } from '@trpc/react-query/server'
import { GetStaticPaths, GetServerSidePropsContext, InferGetStaticPropsType } from 'next'
import type { Artist as ArtistType } from '.'
import { appRouter } from '@/server/routers/_app'
import { client } from 'utils/trpc'

export default function Artist(props: InferGetStaticPropsType<typeof getStaticProps>) {
    const { data, isLoading, error } = client.artist.findone.useQuery({ id: props.id }, {
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })
    if(isLoading) return <div>Loading...</div>
    else if(error instanceof Error) return <div>{error.message}</div>
    return <div>{(data as { artist: ArtistType }).artist.name }</div>
}

export const getStaticPaths: GetStaticPaths<{ artistId: string }> = async () => {

    const res = await fetch('http://localhost:4000/artists')
    const artists: ArtistType[] = await res.json()

    return {
        paths: artists.map(artist => {
            return {
                params: {
                    artistId: String(artist.id)
                }
            }
        }),
        fallback: 'blocking'
    }
}

export async function getStaticProps(context: GetServerSidePropsContext<{ artistId: string }>) {

    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: {}
    })

    const id = parseInt(context.params?.artistId as string)

    await helpers.artist.findone.prefetch({ id })

    return {
        props: {
            trpc: helpers.dehydrate(),
            id
        }
    }
}