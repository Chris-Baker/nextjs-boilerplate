// Checks WCAG 2.2 contrast between theme tokens in both themes, so palette changes can't quietly fail AA.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const source = readFileSync(join(root, 'src/styles/_tokens.scss'), 'utf8');

// [foreground, background, minimum ratio, what it's for]
const pairs = [
    ['text', 'background', 4.5, 'body text'],
    ['text', 'surface', 4.5, 'text on panels'],
    ['muted', 'background', 4.5, 'secondary text'],
    ['muted', 'surface', 4.5, 'secondary text on panels'],
    ['accent', 'background', 4.5, 'links and accent text'],
    ['on-accent', 'accent', 4.5, 'text on primary buttons'],
    ['danger', 'background', 4.5, 'error text'],
    ['success', 'background', 3, 'success indicators'],
    ['warning', 'background', 3, 'warning indicators'],
    ['control-border', 'background', 3, 'form control boundaries']
];

function theme(name) {
    const block = source.match(new RegExp(`@mixin ${name}\\s*\\{([^}]*)\\}`))?.[1];
    if (!block) throw new Error(`Missing @mixin ${name} in _tokens.scss`);
    return Object.fromEntries(
        [...block.matchAll(/--color-([\w-]+):\s*(#[0-9a-f]{3,8})\s*;/gi)].map((m) => [m[1], m[2]])
    );
}

function luminance(hex) {
    const value = hex.slice(1);
    const full = value.length <= 4 ? [...value.slice(0, 3)].map((c) => c + c).join('') : value.slice(0, 6);
    const [r, g, b] = [0, 2, 4].map((i) => {
        const channel = parseInt(full.slice(i, i + 2), 16) / 255;
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const ratio = (a, b) => {
    const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (light + 0.05) / (dark + 0.05);
};

const failures = [];
for (const name of ['light-theme', 'dark-theme']) {
    const colours = theme(name);
    for (const [fg, bg, minimum, use] of pairs) {
        if (!colours[fg] || !colours[bg]) {
            failures.push(`${name}: --color-${fg} or --color-${bg} is missing or not a hex value`);
            continue;
        }
        const value = ratio(colours[fg], colours[bg]);
        if (value < minimum)
            failures.push(
                `${name}: --color-${fg} on --color-${bg} is ${value.toFixed(2)}:1, needs ${minimum}:1 (${use})`
            );
    }
}

if (failures.length > 0) {
    console.error(failures.join('\n'));
    process.exit(1);
}
console.log(`${pairs.length * 2} token pairs meet WCAG 2.2 AA in light and dark themes.`);
