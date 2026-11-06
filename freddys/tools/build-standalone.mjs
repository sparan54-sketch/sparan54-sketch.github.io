import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const files = ['bhad-bunny.jpg', 'bubba-beer-bot.jpg', 'joey-cha-cha.jpg', 'chicken-pete.jpg', 'ticklish-tiggy.jpg', 'tatter-tot-tat.jpg'];

function stripModule(src) {
  return src
    .replace(/import\s+[\s\S]*?\sfrom\s+['"][^'"]+['"]\s*;?/g, '')
    .replace(/export\s+\{[^}]*\}\s*;?/g, '')
    .replace(/^export\s+(async function|function|const|class|let|var)\b/gm, '$1')
    .replace(/^export\s+default\s+/gm, '');
}

export function buildStandalone(outFile) {
  const missing = [];
  const data = {};
  for (const name of files) {
    const bytes = readFileSync(join(root, 'assets', name));
    if (bytes[0] !== 0xff || bytes[1] !== 0xd8) missing.push(name);
    data[`assets/${name}`] = `data:image/jpeg;base64,${bytes.toString('base64')}`;
  }
  if (missing.length) {
    throw new Error(`Refusing standalone build, missing or non-jpeg: ${missing.join(', ')}`);
  }
  const bundled = ['story.js', 'logic.js', 'game.js'].map((name) => stripModule(readFileSync(join(root, name), 'utf8'))).join('\n');
  const css = readFileSync(join(root, 'styles.css'), 'utf8');
  let html = readFileSync(join(root, 'index.html'), 'utf8');
  html = html.replace(
    '<link rel="stylesheet" href="styles.css">',
    () => `<style>\n${css}\n</style>`,
  );
  const payload = `globalThis.FREDDY_ASSET_DATA = ${JSON.stringify(data)};\n${bundled}`;
  html = html.replace(
    '<script type="module" src="game.js"></script>',
    () => `<script>\n${payload}\n</script>`,
  );
  if (html.includes('src="game.js"') || html.includes('href="styles.css"')) {
    throw new Error('Standalone still points at external game files');
  }
  writeFileSync(outFile, html);
  return outFile;
}

if (process.argv[1] && process.argv[1].endsWith('build-standalone.mjs')) {
  const out = process.argv[2] || join(root, 'play-offline.html');
  buildStandalone(out);
  console.log(out);
}
