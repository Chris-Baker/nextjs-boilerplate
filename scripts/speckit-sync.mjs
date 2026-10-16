// Reinstalls the craft extension and preset from speckit/ after you edit them, so the copies Spec Kit uses
// (.specify/ and .claude/skills/speckit-craft-*) match the source. Requires uv (https://docs.astral.sh/uv/).
import { execFileSync } from 'node:child_process';

const version = 'v1.2.0'; // Keep in step with the Spec Kit version in README.md.
const specify = (...args) =>
    execFileSync('uvx', ['--from', `git+https://github.com/github/spec-kit.git@${version}`, 'specify', ...args], {
        stdio: 'inherit'
    });

specify('extension', 'add', '--dev', 'speckit/craft-extension', '--force');
try {
    specify('preset', 'remove', 'craft');
} catch {
    // Not installed yet.
}
specify('preset', 'add', '--dev', 'speckit/craft-preset');

// Spec Kit rewrites .claude/settings.json with its own formatting; restore ours.
execFileSync('npx', ['prettier', '--write', '.claude/settings.json'], { stdio: 'inherit' });
