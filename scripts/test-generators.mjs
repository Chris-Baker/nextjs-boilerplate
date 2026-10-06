import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, readdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from 'sass-embedded';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const scratch = mkdtempSync(join(tmpdir(), 'nextjs-generators-'));
const run = (script, args) =>
    execFileSync(process.execPath, [join(root, script), ...args], { cwd: scratch, stdio: 'pipe' });
const generate = (...args) => run('node_modules/hygen/dist/bin.js', args);
const read = (path) => readFileSync(join(scratch, path), 'utf8');

try {
    for (const path of ['src', '_templates', '.hygen.js'])
        cpSync(join(root, path), join(scratch, path), { recursive: true });
    symlinkSync(join(root, 'node_modules'), join(scratch, 'node_modules'), 'junction');
    const config = JSON.parse(readFileSync(join(root, 'tsconfig.json'), 'utf8'));
    config.include = ['src/**/*.ts', 'src/**/*.tsx'];
    config.compilerOptions.incremental = false;
    writeFileSync(join(scratch, 'tsconfig.json'), JSON.stringify(config));

    generate('component', 'new', '--name', 'plain-card');
    assert.match(read('src/components/atoms/plain-card/index.tsx'), /className, children/);
    assert.doesNotMatch(read('src/components/atoms/plain-card/index.tsx'), /use client/);
    for (const [type, directory] of [
        ['a', 'atoms'],
        ['m', 'molecules'],
        ['o', 'organisms'],
        ['v', 'views']
    ]) {
        generate('component', 'new', '--type', type, '--name', `example-${type}`, '--client');
        assert.match(read(`src/components/${directory}/example-${type}/index.tsx`), /'use client'/);
        assert.match(
            read(`src/components/${directory}/example-${type}/example-${type}.scss`),
            new RegExp(`\\.example-${type}`)
        );
    }
    generate('page', 'new', '--name', 'example-page');
    assert.match(read('src/app/example-page/page.tsx'), /export default function ExamplePagePage/);
    generate('context', 'new', '--name', 'example');
    assert.match(read('src/contexts/example-provider.tsx'), /use client/);
    run('node_modules/typescript/bin/tsc', ['--noEmit', '--project', 'tsconfig.json']);
    const scss = readdirSync(join(scratch, 'src'), { recursive: true }).filter((path) => path.endsWith('.scss'));
    for (const path of scss) compile(join(scratch, 'src', path));
    console.log(
        'Generated server/client components, all directory aliases, App Router page and context compile successfully.'
    );
} catch (error) {
    if (error.stdout) console.error(error.stdout.toString());
    if (error.stderr) console.error(error.stderr.toString());
    throw error;
} finally {
    rmSync(scratch, { recursive: true, force: true });
}
