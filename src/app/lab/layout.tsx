import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

// A sketchbook for divergent directions (`/speckit-craft-explore`). It only exists in development; sketches
// live at src/app/lab/<feature>/<direction>/page.tsx and are deleted once the feature ships.
export default function LabLayout({ children }: { children: ReactNode }) {
    if (process.env.NODE_ENV === 'production') notFound();
    return children;
}
