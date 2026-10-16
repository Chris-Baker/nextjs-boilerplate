'use client';

import { saveSettings, type SettingsState, type SettingsValues } from '@app/app/settings/actions';
import { Button } from '@app/components/atoms/button';
import { Field, Input } from '@app/components/atoms/field';
import { Switch } from '@app/components/atoms/switch';
import { Callout } from '@app/components/molecules/callout';
import { Form } from '@base-ui/react/form';
import { useActionState } from 'react';
import './settings.scss';

const fieldLabels: Record<keyof SettingsValues, string> = {
    displayName: 'Display name',
    email: 'Email',
    weeklyDigest: 'Weekly digest'
};

export type SettingsProps = {
    initialValues: SettingsValues;
};

/**
 * A complete form flow. The browser checks what it can first, in our words via `messages`. The Server
 * Action is the authority: its errors appear on each field through Base UI `Form` errors, which clear as
 * the user edits. Form focuses the first invalid field, and the summary above is announced and links to
 * each problem. Values survive errors.
 */
export function Settings({ initialValues }: SettingsProps) {
    const [state, formAction, pending] = useActionState(saveSettings, {
        status: 'idle',
        values: initialValues
    } satisfies SettingsState);
    const errors = Object.entries(state.errors ?? {}) as [keyof SettingsValues, string][];

    return (
        <main className="settings">
            <header className="settings__header">
                <h1 className="settings__title">Settings</h1>
                <p className="settings__intro">Changes apply to your account on every device.</p>
            </header>

            {errors.length > 0 && (
                <Callout className="settings__summary" tone="danger" title="Check these before saving" live>
                    <ul>
                        {errors.map(([name, message]) => (
                            <li key={name}>
                                <a href={`#settings-${name}`}>{fieldLabels[name]}</a>: {message}
                            </li>
                        ))}
                    </ul>
                </Callout>
            )}
            {state.status === 'saved' && state.savedAt && (
                <Callout className="settings__summary" tone="success" title="Settings saved" live>
                    <p>
                        Saved at{' '}
                        {new Date(state.savedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}.
                    </p>
                </Callout>
            )}

            <Form className="settings__form" action={formAction} errors={state.errors}>
                <Field
                    name="displayName"
                    label="Display name"
                    hint="Shown next to your comments and changes."
                    messages={{ valueMissing: 'Add a display name so people know who changes are from.' }}
                >
                    <Input
                        id="settings-displayName"
                        required
                        autoComplete="nickname"
                        defaultValue={state.values.displayName}
                    />
                </Field>
                <Field
                    name="email"
                    label="Email"
                    hint="We'll only use this for account and security messages."
                    messages={{
                        valueMissing: 'Enter the email address you use for this account.',
                        typeMismatch: 'Enter an email address like name@example.com.'
                    }}
                >
                    <Input
                        id="settings-email"
                        required
                        type="email"
                        autoComplete="email"
                        spellCheck={false}
                        defaultValue={state.values.email}
                    />
                </Field>
                <Switch
                    name="weeklyDigest"
                    defaultChecked={state.values.weeklyDigest}
                    description="A Monday summary of what changed. Unsubscribe from any email."
                >
                    Weekly digest
                </Switch>
                <div className="settings__actions">
                    <Button type="submit" variant="primary" pending={pending}>
                        {pending ? 'Saving…' : 'Save settings'}
                    </Button>
                </div>
            </Form>
        </main>
    );
}
