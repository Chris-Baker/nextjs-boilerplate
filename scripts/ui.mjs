// Copies registry components and flows into the project. Copied code is yours to change.
// Usage: npm run ui list | npm run ui add <name...> [-- --force] [-- --dry-run]
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const registry = join(dirname(dirname(fileURLToPath(import.meta.url))), 'registry');
const { items } = JSON.parse(readFileSync(join(registry, 'registry.json'), 'utf8'));
const byName = new Map(items.map((item) => [item.name, item]));
const [command, ...rest] = process.argv.slice(2);
const flags = new Set(rest.filter((arg) => arg.startsWith('--')));
const names = rest.filter((arg) => !arg.startsWith('--'));

function fail(message) {
    console.error(message);
    process.exit(1);
}

function resolve(name, seen = new Set(), order = []) {
    const item = byName.get(name);
    if (!item) fail(`Unknown registry item "${name}". Run \`npm run ui list\` to see what's available.`);
    if (seen.has(name)) return order;
    seen.add(name);
    for (const dependency of item.registryDependencies ?? []) resolve(dependency, seen, order);
    order.push(item);
    return order;
}

function filesOf(name) {
    const base = join(registry, 'items', name);
    return readdirSync(base, { recursive: true, withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => relative(base, join(entry.parentPath, entry.name)));
}

if (command === 'list') {
    for (const type of ['atom', 'molecule', 'organism', 'flow']) {
        const group = items.filter((item) => item.type === type);
        if (group.length === 0) continue;
        console.log(`\n${type}s`);
        for (const item of group)
            console.log(`  ${item.name.padEnd(18)} ${item.description}\n  ${''.padEnd(18)} ${item.use}`);
    }
    console.log('\nAdd with: npm run ui add <name...>');
} else if (command === 'add') {
    if (names.length === 0) fail('Name at least one item: npm run ui add button');
    const order = [];
    const seen = new Set();
    for (const name of names) resolve(name, seen, order);
    const dryRun = flags.has('--dry-run');
    let skipped = 0;
    for (const item of order) {
        for (const file of filesOf(item.name)) {
            const target = join(process.cwd(), file);
            if (existsSync(target) && !flags.has('--force')) {
                console.log(`skip   ${file} (exists; pass --force to overwrite)`);
                skipped++;
                continue;
            }
            console.log(`${dryRun ? 'would ' : ''}add    ${file}`);
            if (dryRun) continue;
            mkdirSync(dirname(target), { recursive: true });
            copyFileSync(join(registry, 'items', item.name, file), target);
        }
    }
    const installed = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'));
    const declared = { ...installed.dependencies, ...installed.devDependencies };
    const missing = [...new Set(order.flatMap((item) => item.dependencies ?? []))].filter((name) => !declared[name]);
    if (missing.length > 0)
        console.log(`\nInstall the npm packages these items need: npm install ${missing.join(' ')}`);
    if (skipped > 0) console.log(`\n${skipped} existing file(s) kept. Local changes are never overwritten by default.`);
    console.log('\nThis is a starting point. Adapt it to docs/point-of-view.md before calling it done.');
} else {
    fail('Usage: npm run ui list | npm run ui add <name...> [-- --force] [-- --dry-run]');
}
