import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mockDataDir = path.resolve(__dirname, '../../mock-data');

export const loadMockData = (fileName) => {
  try {
    const filePath = path.join(mockDataDir, fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`[MockData] File not found: ${filePath}`);
      return [];
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error(`[MockData] Error reading ${fileName}:`, error);
    return [];
  }
};
