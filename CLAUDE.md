# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

302 AI Studio is an Electron + SvelteKit monorepo application built with modern development tools and TypeScript. The project uses pnpm workspaces, Turbo for task orchestration, and Changesets for version management.

## Architecture

The monorepo follows a clean architecture based on the Electron + SvelteKit integration pattern:

### Core Packages

- **@302-ai-studio/electron-app** (`app/electron/`) - Main Electron application
  - Built with electron-vite for optimal development experience
  - Structured as main/preload processes (renderer removed)
  - Loads SvelteKit application in development via localhost:5173
  - Loads built SvelteKit files in production
  - Depends on shared utilities

- **@302-ai-studio/svelte-app** (`packages/svelte-app/`) - SvelteKit frontend application
  - Svelte 5 application with TypeScript support
  - Configured for Client-Side Rendering (CSR)
  - Built as static files for Electron integration
  - Depends on shared utilities

- **@302-ai-studio/shared** (`packages/shared/`) - Shared utilities, types, and configurations
  - Pure TypeScript library with strict type checking
  - Exports types and utility functions used across packages
  - Built with TypeScript compiler to `dist/` directory

### Build System

The project uses Turbo with dependency-aware task orchestration:
- Build tasks respect package dependencies (`"dependsOn": ["^build"]`)
- Development tasks run persistently without caching
- Lint and type-check tasks depend on prior builds

## Essential Commands

### Development Workflow
```bash
# First time setup (recommended)
pnpm setup

# Start all packages in development mode
pnpm dev

# Development for specific package
pnpm --filter @302-ai-studio/electron-app dev
pnpm --filter @302-ai-studio/shared dev
pnpm --filter @302-ai-studio/svelte-app dev
```

### First Time Setup & Troubleshooting

If you encounter "Electron uninstall" errors:

1. **Use the setup command** (recommended):
   ```bash
   pnpm setup
   ```

2. **Or manually rebuild Electron**:
   ```bash
   pnpm rebuild electron
   ```

3. **For persistent issues**, clear and reinstall:
   ```bash
   rm -rf node_modules
   pnpm install
   ```

The project includes automatic Electron rebuilding via `postinstall` script, but some environments may need manual intervention.

### Build Commands
```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @302-ai-studio/shared build
pnpm --filter @302-ai-studio/svelte-app build

# Build SvelteKit and prepare for Electron
pnpm build:svelte

# Build Electron with integrated SvelteKit
pnpm build:electron
```

### Type Checking
```bash
# Type check all packages
pnpm type-check

# Type check specific package
pnpm --filter @302-ai-studio/electron-app type-check
pnpm --filter @302-ai-studio/svelte-app type-check
```

### Electron Distribution
```bash
# Build for specific platforms (includes SvelteKit build)
pnpm build:electron:win     # Windows
pnpm build:electron:mac     # macOS
pnpm build:electron:linux   # Linux
```

### Dependency Management
```bash
# Add to workspace root
pnpm add <package> -w

# Add to specific package
pnpm add <package> --filter @302-ai-studio/shared
pnpm add <package> --filter @302-ai-studio/svelte-app
pnpm add <package> --filter @302-ai-studio/electron-app
```

## Key Configuration Files

- `turbo.json` - Turbo task configuration with dependency graph
- `pnpm-workspace.yaml` - pnpm workspace package discovery
- `app/electron/electron.vite.config.ts` - Electron-vite configuration with path aliases
- Root `package.json` - Workspace scripts and Node.js/pnpm version requirements

## Package Dependencies

The packages have a clear dependency hierarchy:
- `electron-app` depends on `shared` package only (no longer directly depends on UI)
- `svelte-app` depends on `shared` package
- `shared` has no internal dependencies

The integration between Electron and SvelteKit happens through:
- Development: Electron loads SvelteKit dev server at http://localhost:5173
- Production: SvelteKit builds static files that are copied to Electron's renderer directory

All workspace dependencies use `workspace:*` protocol for internal packages.

## Development Notes

- Node.js >= 22.0.0 and pnpm >= 9.0.0 required
- TypeScript configured with strict mode across all packages
- Electron app loads SvelteKit directly in development for optimal DX
- SvelteKit app uses Svelte 5 with TypeScript support and CSR configuration
- Custom build script handles SvelteKit-to-Electron integration
- Clean commands remove build artifacts (`dist/`, `out/`, `.svelte-kit/`, `build/`)