/** @format */
import { Fragment } from 'react';
import { GlobalStyles } from '@app/styles/global.styles';
import { BootstrapStyles } from '@app/styles/bootstrap.styles';

function App({ Component, pageProps }: any) {
    return (
        <Fragment>
            <BootstrapStyles />
            <GlobalStyles />
            <Component {...pageProps} />
        </Fragment>
    );
}

export default App;
