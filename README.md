# Flows Core Registry

This repository manages the official Flows core app registry, available at <https://registry.useflows.com/core>.

Core apps are applications directly authored and supported by Spacelift.

## 🚀 How to Publish a Core App

### Step 1: Create Your App

Start with our core app template:

- Visit <https://github.com/spacelift-flows-apps/flows-app-template-core>
- Follow the template instructions to create your app

### Step 2: Publish Your First Version

Once your app is ready:

- Follow the template's publishing guide
- Ensure at least one version is successfully published

### Step 3: Add to Registry

To include your app in the core registry:

1. **Create a new branch** in this repository
2. **Create a new directory** under `apps/` with your app name
3. **Add required files**:
   - `manifest.json` - App metadata and configuration
   - `logo.svg` or `logo.png` - App icon
4. **Open a pull request** against the `main` branch

Look at existing apps in the `apps/` directory for examples.

## 🔄 Registry Updates

The registry requires manual synchronization after changes are made:

1. **Run the "Generate registry" workflow** from the Actions tab
2. This will:
   - Process **app manifests** from the `apps/` directory
   - Upload **icons** to cloud storage
   - Generate and publish the **registry index**

The live registry is available at <https://registry.useflows.com/core>
