/**
 * Postinstall script to patch react-native-reanimated and react-native-worklets
 * compatibility files for React Native 0.84 support.
 *
 * RN 0.84 is newer than the latest official compatibility entries.
 * Remove this script once reanimated/worklets ship versions that list 0.84.
 */
const fs = require('fs');
const path = require('path');

function patchCompatibility(pkgName, versionKey, rnVersion) {
  const filePath = path.resolve(
    __dirname,
    '..',
    'node_modules',
    pkgName,
    'compatibility.json',
  );

  if (!fs.existsSync(filePath)) {
    return;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // For reanimated, entries are nested under "fabric"
  const entries = data.fabric || data;
  const entry = entries[versionKey];

  if (entry) {
    const rnVersions = entry['react-native'] || entry;
    if (Array.isArray(rnVersions) && !rnVersions.includes(rnVersion)) {
      rnVersions.push(rnVersion);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
      console.log(`Patched ${pkgName} compatibility for RN ${rnVersion}`);
    }
  }
}

patchCompatibility('react-native-reanimated', '4.2.x', '0.84');
patchCompatibility('react-native-worklets', '0.7.x', '0.84');
