import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@app/styles/global.scss';

export const metadata: Metadata = {
    title: 'Next.js Boilerplate',
    description: 'A Next.js starter with TypeScript, SCSS, BEM and Hygen generators.'
};

// Apply a saved preference before paint. System mode is handled entirely by CSS.
const themeScript = `(function(){try{var mode=localStorage.getItem('theme-mode');if(mode==='light'||mode==='dark'){document.documentElement.dataset.theme=mode}}catch(e){}})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body>{children}</body>
        </html>
    );
}
