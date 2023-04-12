import Link from "next/link";
import { client } from "utils/trpc";

type Artist = {
    id: number
    name: string
    description: string
}

export default function Artists() {

    const { data, isLoading, error } = client.artist.findmany.useQuery()    
    if(isLoading) return <div>Loading...</div>
    else if(error instanceof Error) return <div>{error.message}</div>

    return <div className = 'bg-black text-white h-screen'>
        <Link href = {'/'}>Home</Link>
        <ul>
            {(data as { artists: Artist[]} ).artists.map((val, i) => {
                return <li key = {i}>
                    <div>{val.id}</div>
                    <div>{val.name}</div>
                    <div>{val.description}</div>
                </li>
            })}
        </ul>
    </div>
}