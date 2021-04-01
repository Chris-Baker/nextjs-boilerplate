/** @format */
import { Fragment } from 'react';
import { Global } from '@emotion/react';
import { globalStyles } from '@app/styles/global.styles';
import { bootstrapStyles } from '@app/styles/bootstrap.styles';

function App({ Component, pageProps }: any) {
    return (
        <Fragment>
            <Global styles={globalStyles} />
            <Global styles={bootstrapStyles} />
            <Component {...pageProps} />
        </Fragment>
    );
}

export default App;
