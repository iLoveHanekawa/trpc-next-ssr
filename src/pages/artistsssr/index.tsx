import { GetServerSideProps } from "next"
import { createServerSideHelpers } from '@trpc/react-query/server'
import { appRouter } from "@/server/routers/_app"
import { client } from "utils/trpc"
import { Artist } from "../artists"
export default function ArtistsSSR() {

    const { data, status } = client.artist.findmany.useQuery()
    if(status !== 'success') return <div>Loading...</div>
    return <ul>{(data as { artists: Artist[] }).artists.map((val, i) => {
        return <li key = {i}>
            <div>{val.id}</div>
            <div>{val.name}</div>
            <div>{val.description}</div>
        </li>
    })}</ul>
}

export const getServerSideProps: GetServerSideProps = async() => {
    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: {}
    })
    await helpers.artist.findmany.prefetch()
    return {
        props: {
            trpcState: helpers.dehydrate()
        }
    }
}