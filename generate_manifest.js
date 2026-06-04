import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'public', 'textures');
const dirs = ['floors', 'walls', 'parking', 'concepts'];
const manifest = {};

dirs.forEach(d => {
  const p = path.join(outDir, d);
  if (fs.existsSync(p)) {
    manifest[d] = fs.readdirSync(p).filter(f => f.endsWith('.jpg')).map(f => `/textures/${d}/${f}`);
  } else {
    manifest[d] = [];
  }
});

fs.writeFileSync(path.join(process.cwd(), 'src', 'utils', 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Manifest generated!');
