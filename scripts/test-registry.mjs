import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
    cpSync,
    existsSync,
    mkdtempSync,
    readdirSync,
    readFileSync,
    rmSync,
    symlinkSync,
    writeFileSync
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from 'sass-embedded';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const scratch = mkdtempSync(join(tmpdir(), 'nextjs-registry-'));
const run = (script, args) =>
    execFileSync(process.execPath, [join(scratch, script), ...args], { cwd: scratch, stdio: 'pipe' }).toString();
const { items } = JSON.parse(readFileSync(join(root, 'registry/registry.json'), 'utf8'));
const names = items.map((item) => item.name);

try {
    assert.deepEqual(
        readdirSync(join(root, 'registry/items')).sort(),
        [...names].sort(),
        'registry.json and items/ differ'
    );
    for (const item of items)
        for (const dependency of item.registryDependencies ?? [])
            assert.ok(names.includes(dependency), `${item.name} depends on unknown item ${dependency}`);

    const { dependencies } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
    for (const item of items)
        for (const dependency of item.dependencies ?? [])
            assert.ok(dependencies[dependency], `${item.name} needs ${dependency} in package.json dependencies`);

    for (const path of ['src', 'registry', 'scripts', 'package.json'])
        cpSync(join(root, path), join(scratch, path), { recursive: true });
    symlinkSync(join(root, 'node_modules'), join(scratch, 'node_modules'), 'junction');
    const config = JSON.parse(readFileSync(join(root, 'tsconfig.json'), 'utf8'));
    config.include = ['src/**/*.ts', 'src/**/*.tsx'];
    config.compilerOptions.incremental = false;
    writeFileSync(join(scratch, 'tsconfig.json'), JSON.stringify(config));

    // Dependencies are resolved: adding the flow brings in its components.
    run('scripts/ui.mjs', ['add', 'settings-flow']);
    assert.ok(existsSync(join(scratch, 'src/components/atoms/button/index.tsx')));
    assert.ok(existsSync(join(scratch, 'src/app/settings/actions.ts')));

    // Local edits survive a second add.
    const button = join(scratch, 'src/components/atoms/button/index.tsx');
    writeFileSync(button, `${readFileSync(button, 'utf8')}\n// local change\n`);
    assert.match(run('scripts/ui.mjs', ['add', ...names]), /skip {3}src\/components\/atoms\/button\/index\.tsx/);
    assert.match(readFileSync(button, 'utf8'), /local change/);

    run('node_modules/typescript/bin/tsc', ['--noEmit', '--project', 'tsconfig.json']);
    const scss = readdirSync(join(scratch, 'src'), { recursive: true }).filter((path) => path.endsWith('.scss'));
    for (const path of scss) compile(join(scratch, 'src', path), { loadPaths: [join(scratch, 'src/styles')] });
    run('scripts/check-tokens.mjs', []);
    console.log(`All ${names.length} registry items install with dependencies, keep local edits, and compile.`);
} catch (error) {
    if (error.stdout) console.error(error.stdout.toString());
    if (error.stderr) console.error(error.stderr.toString());
    throw error;
} finally {
    rmSync(scratch, { recursive: true, force: true });
}
