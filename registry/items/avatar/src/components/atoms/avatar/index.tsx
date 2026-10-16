import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import './avatar.scss';

export type AvatarProps = {
    /** The person's name. Used for the image's alt text and the initials fallback. */
    name: string;
    src?: string;
    size?: 'small' | 'medium' | 'large';
    /** Set when the name is already shown next to the avatar, so screen readers don't hear it twice. */
    decorative?: boolean;
    className?: string;
};

function initialsOf(name: string) {
    const words = name.trim().split(/\s+/).filter(Boolean);
    const letters = words.length > 1 ? [words[0], words[words.length - 1]] : words;
    return letters.map((word) => Array.from(word)[0]?.toLocaleUpperCase() ?? '').join('');
}

/** A photo that falls back to initials while it loads or if it fails, so there's never an empty circle. */
export function Avatar({ name, src, size = 'medium', decorative = false, className }: AvatarProps) {
    const accessibleName = decorative ? undefined : name;

    return (
        <BaseAvatar.Root className={['avatar', `avatar--${size}`, className].filter(Boolean).join(' ')}>
            {src && <BaseAvatar.Image className="avatar__image" src={src} alt={accessibleName ?? ''} />}
            {/* The delay avoids flashing initials when a cached photo loads straight away. */}
            <BaseAvatar.Fallback
                className="avatar__fallback"
                delay={src ? 400 : undefined}
                role={accessibleName ? 'img' : undefined}
                aria-label={accessibleName}
                aria-hidden={accessibleName ? undefined : true}
            >
                {initialsOf(name)}
            </BaseAvatar.Fallback>
        </BaseAvatar.Root>
    );
}
