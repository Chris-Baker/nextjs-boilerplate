import { Fragment } from 'react';
import Head from 'next/head';
import { GlobalStyles } from '@app/styles/global.styles';

function App({ Component, pageProps }: any) {
    return (
        <Fragment>
            <Head>
                <title>NextJS Boilerplate</title>
                <meta name="description" content="Boilerplate project for NextJS 12.x" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <GlobalStyles />
            <Component {...pageProps} />
        </Fragment>
    );
}

export default App;
