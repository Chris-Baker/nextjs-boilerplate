'use server';

export type SettingsValues = {
    displayName: string;
    email: string;
    weeklyDigest: boolean;
};

export type SettingsState = {
    status: 'idle' | 'saved' | 'invalid';
    values: SettingsValues;
    errors?: Partial<Record<keyof SettingsValues, string>>;
    savedAt?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function saveSettings(_previous: SettingsState, formData: FormData): Promise<SettingsState> {
    // Verify authentication and authorisation here. Server Actions are public endpoints, even when
    // the form is only rendered on a protected page.

    const values: SettingsValues = {
        displayName: String(formData.get('displayName') ?? '').trim(),
        email: String(formData.get('email') ?? '').trim(),
        weeklyDigest: formData.get('weeklyDigest') === 'on'
    };

    const errors: SettingsState['errors'] = {};
    if (!values.displayName) errors.displayName = 'Add a display name so people know who changes are from.';
    else if (values.displayName.length > 50)
        errors.displayName = `Use 50 characters or fewer. This one has ${values.displayName.length}.`;
    if (!emailPattern.test(values.email)) errors.email = 'Enter an email address like name@example.com.';

    // Return what the user typed so a mistake never costs them their other changes.
    if (Object.keys(errors).length > 0) return { status: 'invalid', values, errors };

    // Persist the values here, then revalidate any cached pages that show them.

    return { status: 'saved', values, savedAt: new Date().toISOString() };
}
