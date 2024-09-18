import fs from 'fs';
import path from 'path';

// Convertir l'URL du fichier en chemin absolu
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Saves match links to a JSON file.
 */
export async function saveMatchLinks(links: string[]): Promise<void> {
  const filePath = path.resolve(__dirname, 'match_links.json');
  await fs.promises.writeFile(filePath, JSON.stringify(links, null, 2), 'utf-8');
  console.log(`Match links saved to ${filePath}`);
}
