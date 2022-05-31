/** @format */

import { Fragment } from 'react';

function App({ Component, pageProps }: any) {
    return (
        <Fragment>
            <Component {...pageProps} />
        </Fragment>
    );
}

export default App;
