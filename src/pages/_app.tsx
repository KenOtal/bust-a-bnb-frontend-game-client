/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import 'rsuite/lib/styles/index.less'
import '../styles/globals.less'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Bust a BNB</title>
                <style>
                    {`@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700;900&amp;display=swap" rel="stylesheet')`}
                </style>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
