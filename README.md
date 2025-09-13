# 302 AI Studio

A modern Electron + SvelteKit monorepo application with internationalization support and shadcn/ui components.

## 🏗️ Project Structure

```
302-ai-studio-monorepo/
├── app/
│   └── electron/          # @302-ai-studio/electron-app - Main Electron application
├── packages/
│   ├── shared/           # @302-ai-studio/shared - Shared utilities and types
│   └── svelte-app/       # @302-ai-studio/svelte-app - SvelteKit frontend application
├── scripts/
│   └── build-svelte.js   # Custom SvelteKit→Electron integration script
├── turbo.json           # Turbo configuration
├── pnpm-workspace.yaml  # pnpm workspace configuration
└── package.json         # Root package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22.0.0
- pnpm >= 10.15.1

### Installation

```bash
# Recommended: Use setup command (handles Electron rebuild automatically)
pnpm setup

# Or manual installation
pnpm install

# Start development
pnpm dev
```

### Troubleshooting Setup

If you encounter Electron uninstall errors:

```bash
# Option 1: Use setup command
pnpm setup

# Option 2: Manual rebuild
pnpm rebuild electron

# Option 3: Clean install
rm -rf node_modules && pnpm install
```

### Available Scripts

- `pnpm dev` - Start development mode for all packages
- `pnpm build` - Build all packages
- `pnpm build:svelte` - Build SvelteKit and prepare for Electron
- `pnpm build:electron` - Build Electron with integrated SvelteKit
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint` - Run linting (prettier + eslint)
- `pnpm format` - Auto-format code with prettier
- `pnpm clean` - Clean all build outputs

### Package-specific Scripts

#### Electron App (`app/electron`)
```bash
cd app/electron

# Development
pnpm dev

# Build
pnpm build

# Build for specific platform
pnpm build:win    # Windows
pnpm build:mac    # macOS
pnpm build:linux  # Linux
```

#### Shared Package (`packages/shared`)
```bash
cd packages/shared

# Build
pnpm build

# Development (watch mode)
pnpm dev
```

#### SvelteKit App (`packages/svelte-app`)
```bash
# Development with filter
pnpm --filter @302-ai-studio/svelte-app dev

# Build
pnpm --filter @302-ai-studio/svelte-app build

# Type checking with watch mode
pnpm --filter @302-ai-studio/svelte-app check:watch
```

## 🛠️ Technology Stack

- **Framework**: Electron + SvelteKit 5
- **Language**: TypeScript (strict mode)
- **Build Tools**: electron-vite, Vite
- **Package Manager**: pnpm
- **Monorepo**: Turbo
- **UI Components**: shadcn/ui for Svelte
- **Styling**: Tailwind CSS
- **Internationalization**: @inlang/paraglide-js (Chinese base, English support)
- **Code Quality**: ESLint, Prettier, Pre-commit hooks
- **Development**: Hot reload, TypeScript strict mode

## 📦 Packages

### @302-ai-studio/shared
Shared utilities, types, and configurations used across the application. Built with TypeScript compiler to `dist/` directory.

### @302-ai-studio/svelte-app
SvelteKit 5 frontend application with:
- Client-Side Rendering (CSR) with static adapter
- Internationalization support (Chinese/English)
- shadcn/ui components with Tailwind CSS
- Built as static files for Electron integration

### @302-ai-studio/electron-app
Main Electron application with main/preload processes:
- Loads SvelteKit dev server in development (localhost:5173)
- Loads built SvelteKit files in production
- Built with electron-vite for optimal development experience

## 🔧 Development

### Adding New Dependencies

```bash
# Add to workspace root
pnpm add <package> -w

# Add to specific package
pnpm add <package> --filter @302-ai-studio/shared
pnpm add <package> --filter @302-ai-studio/svelte-app
pnpm add <package> --filter @302-ai-studio/electron-app
```

### Code Quality

```bash
# Run linting (prettier + eslint)
pnpm lint

# Auto-format code
pnpm format

# Type checking
pnpm typecheck
```

### Pre-commit Hooks

The project includes comprehensive pre-commit hooks that automatically run:
- prettier formatting
- eslint linting
- svelte-check type checking
- conventional commit message validation

## 🏗️ Build & Deploy

### Building for Production

```bash
# Build all packages
pnpm build

# Build SvelteKit and prepare for Electron (copies to app/electron/out/renderer/)
pnpm build:svelte

# Build Electron with integrated SvelteKit
pnpm build:electron

# Build for specific platforms (includes SvelteKit build)
pnpm build:electron:win     # Windows
pnpm build:electron:mac     # macOS
pnpm build:electron:linux   # Linux
```

### Development Architecture

The project uses a sophisticated integration between Electron and SvelteKit:

**Development Mode:**
- SvelteKit runs on localhost:5173
- Electron loads the SvelteKit dev server
- Hot reload and fast refresh work seamlessly

**Production Mode:**
- Custom `scripts/build-svelte.js` builds SvelteKit to static files
- Files are copied to `app/electron/out/renderer/`
- Electron loads the built static files

### Internationalization

The project includes full i18n support:
- Base language: Chinese (zh)
- Additional language: English (en)
- Message files in `packages/svelte-app/messages/`
- Configuration in `packages/svelte-app/project.inlang/settings.json`
- Uses @inlang/paraglide-js for type-safe translations

## 📝 License

MIT
