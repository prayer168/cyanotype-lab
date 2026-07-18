import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const blocked = [/待補/g, /TODO/gi, /lorem ipsum/gi, /javascript:void\(0\)/gi];
const required = ['index.html', 'src/main.js', 'src/style.css', 'docs/references.md', 'docs/learning-contract.md'];
let failed = false;

for (const file of required) {
  try { readFileSync(join(root, file)); }
  catch { console.error(`Missing required file: ${file}`); failed = true; }
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (['node_modules', 'dist', '.git'].includes(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(html|js|css|md)$/.test(name)) {
      const text = readFileSync(path, 'utf8');
      for (const pattern of blocked) {
        const hits = text.match(pattern);
        if (hits) { console.error(`Placeholder pattern ${pattern} in ${path}`); failed = true; }
      }
    }
  }
}
walk(root);

if (failed) process.exit(1);
console.log('Content verification passed: required files exist and no blocked placeholders were found.');
