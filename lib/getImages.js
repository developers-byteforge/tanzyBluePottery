import fs from 'fs';
import path from 'path';

const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'];

/**
 * Reads all image files from a folder inside public/images/.
 * Returns an array of image paths like "/images/gallery/pottery-1.jpg".
 * Images are sorted alphabetically so new additions slot in predictably.
 *
 * @param {string} subfolder - e.g. "gallery", "hands-on", "collections/diwali"
 * @returns {string[]} array of public URL paths
 */
export function getImages(subfolder) {
    const dirPath = path.join(process.cwd(), 'public', 'images', subfolder);

    if (!fs.existsSync(dirPath)) {
        return [];
    }

    const files = fs.readdirSync(dirPath);

    return files
        .filter((file) => {
            const ext = path.extname(file).toLowerCase();
            return VALID_EXTENSIONS.includes(ext) && !file.startsWith('.');
        })
        .sort()
        .map((file) => `/images/${subfolder}/${file}`);
}
