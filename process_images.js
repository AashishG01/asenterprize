import { Jimp } from 'jimp';
import fs from 'fs';
import path from 'path';

const srcMix = path.join(process.cwd(), 'Tile Images Mix');
const srcConcepts = path.join(process.cwd(), '300 x 450 wall tile');
const outDir = path.join(process.cwd(), 'public', 'textures');

const dirs = ['floors', 'walls', 'parking', 'concepts'];
dirs.forEach(d => {
  const p = path.join(outDir, d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

async function processImages() {
  try {
    // 1. Process Mix Directory
    const mixFiles = fs.existsSync(srcMix) ? fs.readdirSync(srcMix) : [];
    let floorIdx = 1, wallIdx = 1, parkingIdx = 1;
    
    for (const file of mixFiles) {
      if (!file.match(/\.(png|jpe?g)$/i)) continue;
      const srcPath = path.join(srcMix, file);
      const lower = file.toLowerCase();
      
      let outPath, w, h;
      if (lower.includes('floor')) {
        outPath = path.join(outDir, 'floors', `floor-${floorIdx++}.jpg`);
        w = 1024; h = 1024;
      } else if (lower.includes('parking')) {
        outPath = path.join(outDir, 'parking', `parking-${parkingIdx++}.jpg`);
        w = 1024; h = 1024;
      } else if (lower.includes('wall')) {
        outPath = path.join(outDir, 'walls', `wall-${wallIdx++}.jpg`);
        w = 1024; h = 1536; // 2:3 ratio
      } else {
        continue; // Skip unrecognized
      }
      
      console.log(`Processing Mix: ${file} -> ${path.basename(outPath)}`);
      const img = await Jimp.read(srcPath);
      img.cover({ w, h });
      await img.write(outPath);
    }

    // 2. Process Concepts Directory
    const conceptFiles = fs.existsSync(srcConcepts) ? fs.readdirSync(srcConcepts) : [];
    for (const file of conceptFiles) {
      if (!file.match(/\.(png|jpe?g)$/i)) continue;
      const srcPath = path.join(srcConcepts, file);
      
      // clean up filename: '10370-DK.jpg.jpeg' -> '10370-DK'
      let cleanName = file.replace(/\.(jpg|jpeg|png)$/ig, '').replace(/\.(jpg|jpeg|png)$/ig, '');
      // replace spaces and special chars
      cleanName = cleanName.replace(/[^a-zA-Z0-9-]/g, '-').replace(/-+/g, '-');
      
      const outPath = path.join(outDir, 'concepts', `${cleanName}.jpg`);
      console.log(`Processing Concept: ${file} -> ${path.basename(outPath)}`);
      
      const img = await Jimp.read(srcPath);
      // Wall concepts are 300x450 (2:3)
      img.cover({ w: 1024, h: 1536 });
      await img.write(outPath);
    }
    
    console.log('All images processed successfully!');
  } catch (err) {
    console.error('Error processing images:', err);
  }
}

processImages();
