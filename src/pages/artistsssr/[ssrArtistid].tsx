import { GetServerSidePropsContext, InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { appRouter } from '@/server/routers/_app'
import { client } from 'utils/trpc'
import { Artist } from '../artists'

export default function ArtistSSR(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const { data, status } = client.artist.findone.useQuery({ id: props.id })
    if(status !== 'success') return <div>Loading...</div>
    return <div>{(data as { artist: Artist }).artist.name}</div>
}

export const getServerSideProps: GetServerSideProps<{ id: number }, { ssrArtistid: string }> = async(context) => {

    const { params } = context
    const { ssrArtistid } = params as { ssrArtistid: string }

    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: {}
    })

    const artist = await helpers.artist.findone.fetch({ id: parseInt(ssrArtistid) })
    console.log(artist)
    return {
        props: {
            trpcState: helpers.dehydrate(),
            id: parseInt(ssrArtistid)
        }
    }
}