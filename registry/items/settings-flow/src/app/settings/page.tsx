import { Settings } from '@app/components/views/settings';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Settings'
};

export default function SettingsPage() {
    // Load the saved values for the signed-in user here and pass them to the view.
    return <Settings initialValues={{ displayName: '', email: '', weeklyDigest: true }} />;
}
