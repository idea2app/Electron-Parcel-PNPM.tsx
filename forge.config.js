import { readFileSync, readdirSync } from 'fs';

const { name, license, author, description } = readFileSync(
  'package.json',
  'utf8'
);
const options = { name, license, author, description };

const runtimeAssets = ['package.json', 'node_modules', 'dist'];
const ignore = readdirSync('.').filter(name => !runtimeAssets.includes(name));

const packagerConfig = { executableName: name, ignore };

export default {
  packagerConfig,
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        win32metadata: {
          ProductName: name,
          CompanyName: author,
          FileDescription: description
        }
      }
    },
    { name: '@electron-forge/maker-zip', platforms: ['darwin'] },
    {
      name: '@electron-forge/maker-deb',
      config: { options },
      ...packagerConfig
    },
    {
      name: '@electron-forge/maker-rpm',
      config: { options },
      ...packagerConfig
    }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: { owner: 'idea2app', name: 'Electron-Parcel-PNPM.ts' },
        prerelease: true
      }
    }
  ]
};
