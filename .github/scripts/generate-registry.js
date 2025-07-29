#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function generateRegistry() {
  const appsDir = path.join(__dirname, "..", "..", "apps");
  const registry = { apps: {} };

  if (!fs.existsSync(appsDir)) {
    console.error("Apps directory not found");
    process.exit(1);
  }

  const appDirs = fs
    .readdirSync(appsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const appName of appDirs) {
    const appDir = path.join(appsDir, appName);
    const manifestPath = path.join(appDir, "manifest.json");

    if (!fs.existsSync(manifestPath)) {
      console.warn(`Manifest not found for app: ${appName}`);
      continue;
    }

    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

      // Find icon file (any .png or .svg)
      const files = fs.readdirSync(appDir);
      const iconFileName = files.find(
        (file) => file.endsWith(".png") || file.endsWith(".svg")
      );

      if (!iconFileName) {
        console.warn(`No icon found for app: ${appName}`);
        continue;
      }

      registry.apps[appName] = {
        name: manifest.name,
        description: manifest.description,
        blockStyle: {
          iconUrl: `https://registry.useflows.com/core/apps/${appName}/${iconFileName}`,
          color: manifest.color,
        },
        appMetadataUrl: `https://registry.useflows.com/core/apps/${appName}/versions.json`,
      };

      console.log(`Added app: ${appName}`);
    } catch (error) {
      console.error(`Error processing app ${appName}:`, error.message);
    }
  }

  const registryPath = path.join(__dirname, "..", "..", "registry.json");
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
  console.log(
    `Registry generated with ${Object.keys(registry.apps).length} apps`
  );
  console.log(`Registry saved to: ${registryPath}`);
}

generateRegistry();
