import { Jimp } from 'jimp';
import fs from 'fs';
import path from 'path';

const texturesDir = path.join(process.cwd(), 'public', 'textures');
const STANDARD_SIZE = 1024;

async function resizeImages() {
  try {
    const files = fs.readdirSync(texturesDir);
    const jpgFiles = files.filter(f => f.toLowerCase().endsWith('.jpg'));
    
    for (const file of jpgFiles) {
      const filePath = path.join(texturesDir, file);
      console.log(`Processing ${file}...`);
      
      const image = await Jimp.read(filePath);
      
      // Resize with cover (crop to square to ensure standard size without distortion)
      image.cover({ w: STANDARD_SIZE, h: STANDARD_SIZE });
      
      await image.write(filePath);
      console.log(`Successfully resized ${file}`);
    }
    console.log('All images resized successfully!');
  } catch (error) {
    console.error('Error resizing images:', error);
  }
}

resizeImages();
