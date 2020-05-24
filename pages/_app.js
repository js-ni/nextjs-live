import Head from 'next/head'
import {Box, CSSReset, ThemeProvider} from '@chakra-ui/core'

import GlobalCSS from '../GlobalCSS'

export default function App({Component, pageProps}) {
  return (
    <ThemeProvider>
      <Head>
        <title>JavaScript Nicaragua</title>
      </Head>
      <CSSReset />
      <GlobalCSS />
      <Box m="auto" maxW="containers.lg" p={4}>
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  )
}
