import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import normalizePackageData from 'normalize-package-data';

const readPackage = (cwd = '.', normalize = false) => {
  try {
    const packagePath = resolve(cwd, 'package.json');
    const packageFile = readFileSync(packagePath, 'utf8'); // Use readFileSync instead of readFile
    const packageData = JSON.parse(packageFile);

    if (normalize) {
      normalizePackageData(packageData);
    }
    return packageData;
  } catch (error) {
    throw new Error(`Failed to read package.json: ${error.message}`);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { readPackage };
