import '@fortawesome/fontawesome-svg-core/styles.css'

import '../styles/globals.css'

import Head from 'next/head'

export default function App({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>JavaScript Nicaragua</title>
      </Head>
      <div className="max-w-6xl mx-auto p-4">
        <Component {...pageProps} />
      </div>
    </>
  )
}
