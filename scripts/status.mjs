// Reports which parts of the project's intent are still unwritten. Runs at the start of every agent session
// (see .claude/settings.json) so agents know what they must ask the owner rather than guess.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (path) => (existsSync(join(root, path)) ? readFileSync(join(root, path), 'utf8') : '');
const unwritten = (path) => /\*\*Status: not yet written\.\*\*/.test(read(path));

const checks = [
    {
        label: 'Point of view',
        todo: unwritten('docs/point-of-view.md'),
        fix: 'run /speckit-craft-point-of-view before designing anything users see'
    },
    {
        label: 'Voice',
        todo: unwritten('docs/voice.md'),
        fix: 'run /speckit-craft-voice before writing user-facing copy'
    },
    {
        label: 'Design tokens',
        todo: /neutral placeholders/.test(read('src/styles/_tokens.scss')),
        fix: 'run /speckit-craft-tokens to replace the placeholder palette'
    },
    {
        label: 'Constitution',
        todo:
            !read('.specify/memory/constitution.md') ||
            /\[PRINCIPLE_1_NAME\]/.test(read('.specify/memory/constitution.md')),
        fix: 'run /speckit-constitution'
    }
];

const specs = existsSync(join(root, 'specs'))
    ? readdirSync(join(root, 'specs'), { withFileTypes: true }).filter((entry) => entry.isDirectory()).length
    : 0;

console.log('Project intent status (docs/principles.md explains why this matters):');
for (const { label, todo, fix } of checks) console.log(`- ${label}: ${todo ? `NOT YET WRITTEN, ${fix}` : 'written'}`);
console.log(`- Feature specs: ${specs} in specs/`);
if (checks.some((check) => check.todo))
    console.log(
        'Until these are written, ask the project owner instead of inventing audience, brand, tone or visual direction.'
    );
