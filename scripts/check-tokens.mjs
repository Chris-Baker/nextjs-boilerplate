// Keeps visual decisions in src/styles/_tokens.scss so people and agents can't drift from them.
import { readdirSync, readFileSync } from 'node:fs';
import { basename, dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const tokens = join('src', 'styles', '_tokens.scss');
const rawColour = /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(/gi;
const problems = [];

const files = ['src', 'registry'].flatMap((directory) =>
    readdirSync(join(root, directory), { recursive: true })
        .filter((path) => path.endsWith('.scss'))
        .map((path) => join(directory, path))
);

for (const file of files) {
    if (file === tokens) continue;
    const source = readFileSync(join(root, file), 'utf8');
    source.split('\n').forEach((line, index) => {
        const code = line.replace(/\/\/.*$/, '');
        for (const match of code.matchAll(rawColour))
            problems.push(`${file}:${index + 1} raw colour "${match[0]}"; add or use a token in ${tokens}`);
    });

    // Component styles are global, so each file's block must match its component directory.
    const block = basename(file, '.scss');
    const isComponent = file.split(sep).includes('components') && basename(dirname(file)) === block;
    if (isComponent && !new RegExp(`^\\.${block}\\s*\\{`, 'm').test(source))
        problems.push(`${file} should define the BEM block .${block}`);
}

if (problems.length > 0) {
    console.error(problems.join('\n'));
    process.exit(1);
}
console.log(`Checked ${files.length} SCSS files against ${relative(root, join(root, tokens))}.`);
