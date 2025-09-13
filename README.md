# 302 AI Studio

A modern Electron + SvelteKit monorepo application.

## 🏗️ Project Structure

```
302-ai-studio/
├── app/
│   └── electron/          # Electron main application
├── packages/
│   ├── shared/           # Shared utilities and types
│   └── ui/               # SvelteKit UI component library
├── turbo.json           # Turbo configuration
├── pnpm-workspace.yaml  # pnpm workspace configuration
└── package.json         # Root package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22.0.0
- pnpm >= 9.0.0

### Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development
pnpm dev
```

### Available Scripts

- `pnpm dev` - Start development mode for all packages
- `pnpm build` - Build all packages
- `pnpm type-check` - Run TypeScript type checking
- `pnpm lint` - Run linting
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

#### UI Package (`packages/ui`)
```bash
cd packages/ui

# Development
pnpm dev

# Build
pnpm build
```

## 🛠️ Technology Stack

- **Framework**: Electron + SvelteKit
- **Language**: TypeScript
- **Build Tool**: electron-vite, Vite
- **Package Manager**: pnpm
- **Monorepo**: Turbo
- **Version Management**: Changesets

## 📦 Packages

### @302-ai-studio/shared
Shared utilities, types, and configurations used across the application.

### @302-ai-studio/ui
SvelteKit-based UI component library with reusable components.

### @302-ai-studio/electron-app
Main Electron application that brings everything together.

## 🔧 Development

### Adding New Dependencies

```bash
# Add to workspace root
pnpm add <package> -w

# Add to specific package
pnpm add <package> --filter @302-ai-studio/shared
```

### Creating Changesets

```bash
pnpm changeset
```

### Publishing

```bash
pnpm version-packages
pnpm release
```

## 🏗️ Build & Deploy

### Building for Production

```bash
# Build all packages
pnpm build

# Build Electron app for current platform
cd app/electron && pnpm build

# Build for specific platforms
cd app/electron && pnpm build:win
cd app/electron && pnpm build:mac
cd app/electron && pnpm build:linux
```

## 📝 License

MIT