import * as React from 'react';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import Head from 'next/head';
import { StylesRegistry } from '@app/app/styles-registry';

interface RootLayoutProps {
    children: ReactNode;
}

export const metadata: Metadata = {
    title: 'NextJS Boilerplate',
    description: 'Boilerplate project for NextJS 14.x'
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <StylesRegistry options={{ key: 'mui' }}>{children}</StylesRegistry>
            </body>
        </html>
    );
}
