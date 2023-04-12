import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { client } from 'utils/trpc'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default client.withTRPC(App)
