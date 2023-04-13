import Link from "next/link";
import { client } from "utils/trpc";
import { appRouter } from "@/server/routers/_app";
import { createServerSideHelpers } from '@trpc/react-query/server'
import { InferGetStaticPropsType } from "next";

export type Artist = {
    id: number
    name: string
    description: string
}

export default function Artists(props: InferGetStaticPropsType<typeof getStaticProps>) {

    const { data, isLoading, error } = client.artist.findmany.useQuery(undefined, {
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })    
    if(isLoading) return <div>Loading...</div>
    else if(error instanceof Error) return <div>{error.message}</div>

    return <div className = 'bg-black text-white h-screen'>
        <Link href = {'/'}>Home</Link>
        <ul>
            {(data as { artists: Artist[] } ).artists.map((val, i) => {
                return <li key = {i}>
                    <div>{val.id}</div>
                    <div>{val.name}</div>
                    <div>{val.description}</div>
                </li>
            })}
        </ul>
    </div>
}

export const getStaticProps = async() => {

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
