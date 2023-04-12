import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { client } from 'utils/trpc'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App({ Component, pageProps }: AppProps) {
  return <>
    <ReactQueryDevtools />
    <Component {...pageProps} />
  </>
}

export default client.withTRPC(App)
