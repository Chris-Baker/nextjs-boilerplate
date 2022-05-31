/** @format */

import Head from 'next/head';
import { Home } from '@app/components/views/home';

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>NextJS Boilerplate: Homepage</title>
                <meta property="og:title" content="NextJS Boilerplate: Homepage" key="title" />
            </Head>
            <Home />
        </div>
    );
}
