import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const subscriptionFilePath = path.resolve(__dirname, '../src/subscription.ts');

try {
  let content = fs.readFileSync(subscriptionFilePath, 'utf-8');
  const versionRegex = /version:\s*(\d+)/;

  if (versionRegex.test(content)) {
    content = content.replace(
      versionRegex,
      (match: string, version: string) => {
        const newVersion = parseInt(version, 10) + 1;
        console.log(
          `Bumping subscription version from ${version} to ${newVersion}`,
        );
        return `version: ${newVersion}`;
      },
    );

    fs.writeFileSync(subscriptionFilePath, content, 'utf-8');
    console.log('Successfully updated src/subscription.ts.');
  } else {
    console.warn('Could not find "version: <number>" in src/subscription.ts');
    process.exit(0);
  }
} catch (error) {
  console.error('Failed to bump version:', error);
  process.exit(1);
}
