# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

302 AI Studio is an Electron + SvelteKit monorepo application built with modern development tools and TypeScript. The project uses pnpm workspaces, Turbo for task orchestration, and includes internationalization support with shadcn/ui components.

## Architecture

The monorepo follows a clean architecture based on the Electron + SvelteKit integration pattern:

### Core Packages

- **@302-ai-studio/electron-app** (`app/electron/`) - Main Electron application
  - Built with electron-vite for optimal development experience
  - Structured as main/preload processes (renderer removed)
  - Loads SvelteKit application in development via localhost:5173
  - Loads built SvelteKit files in production via custom build script
  - Depends on shared utilities

- **@302-ai-studio/svelte-app** (`packages/svelte-app/`) - SvelteKit frontend application
  - Svelte 5 application with TypeScript support
  - Configured for Client-Side Rendering (CSR) with static adapter
  - Built as static files for Electron integration
  - Includes internationalization with paraglide-js (Chinese base, English support)
  - Uses shadcn/ui component library with slate theme
  - Depends on shared utilities

- **@302-ai-studio/shared** (`packages/shared/`) - Shared utilities, types, and configurations
  - Pure TypeScript library with strict type checking
  - Exports types and utility functions used across packages
  - Built with TypeScript compiler to `dist/` directory

### Build System

The project uses Turbo with dependency-aware task orchestration:
- Build tasks respect package dependencies (`"dependsOn": ["^build"]`)
- Development tasks run persistently without caching
- Lint and typecheck tasks depend on prior builds
- Custom SvelteKit→Electron integration via `scripts/build-svelte.js`

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

# Build SvelteKit and prepare for Electron (copies to app/electron/out/renderer/)
pnpm build:svelte

# Build Electron with integrated SvelteKit
pnpm build:electron
```

### Code Quality & Formatting
```bash
# Run linting and format checks (prettier + eslint)
pnpm lint

# Auto-format code with prettier
pnpm format

# Run all type checking
pnpm typecheck

# Type check specific package
pnpm --filter @302-ai-studio/electron-app typecheck
pnpm --filter @302-ai-studio/svelte-app typecheck
```

### Electron Distribution
```bash
# Build for specific platforms (includes SvelteKit build)
pnpm build:electron:win     # Windows
pnpm build:electron:mac     # macOS
pnpm build:electron:linux   # Linux
```

### Development Tools
```bash
# SvelteKit type checking with watch mode
pnpm --filter @302-ai-studio/svelte-app check:watch

# Clean all build artifacts
pnpm clean
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
- `scripts/build-svelte.js` - Custom SvelteKit→Electron integration script
- `.pre-commit-config.yaml` - Comprehensive pre-commit hooks (prettier, eslint, svelte-check, conventional commits)
- `eslint.config.js` - Flat ESLint config for TypeScript, Svelte, and Electron
- Root `package.json` - Workspace scripts and Node.js/pnpm version requirements

## Package Dependencies

The packages have a clear dependency hierarchy:
- `electron-app` depends on `shared` package only (no longer directly depends on UI)
- `svelte-app` depends on `shared` package
- `shared` has no internal dependencies

The integration between Electron and SvelteKit happens through:
- Development: Electron loads SvelteKit dev server at http://localhost:5173
- Production: SvelteKit builds static files that are copied to `app/electron/out/renderer/` via build script

All workspace dependencies use `workspace:*` protocol for internal packages.

## Internationalization (i18n)

The project uses `@inlang/paraglide-js` for internationalization:
- Base locale: Chinese (`zh`), with English (`en`) support
- Message files located in `packages/svelte-app/messages/`
- Configuration in `packages/svelte-app/project.inlang/settings.json`
- Paraglide generates code that is excluded from version control
- Custom script available for sorting message keys

## UI Components

The project uses shadcn/ui for Svelte:
- Configuration in `packages/svelte-app/components.json`
- Uses slate as base color theme
- Component aliases configured for easy imports
- Tailwind CSS integration for styling

## Development Notes

- Node.js >= 22.0.0 and pnpm >= 10.15.1 required
- TypeScript configured with strict mode across all packages
- Electron app loads SvelteKit directly in development for optimal DX
- SvelteKit app uses Svelte 5 with TypeScript support and CSR configuration
- Pre-commit hooks enforce conventional commit messages with specific scopes
- Clean commands remove build artifacts (`dist/`, `out/`, `.svelte-kit/`, `build/`)
- Testing infrastructure is not yet configured (placeholder scripts exist)

## Important Notes

- The custom `scripts/build-svelte.js` handles the critical SvelteKit→Electron file copying
- SvelteKit development server is specifically configured for port 5173
- Pre-commit hooks include comprehensive checks: svelte-check, prettier, eslint, and conventional commits
- Paraglide i18n code generation should not be committed (excluded in .gitignore)