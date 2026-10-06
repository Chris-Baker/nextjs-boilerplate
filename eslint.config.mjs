import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
    ...nextVitals,
    ...nextTypescript,
    prettier,
    { files: ['.hygen.js', 'next.config.js'], rules: { '@typescript-eslint/no-require-imports': 'off' } },
    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts'])
]);
