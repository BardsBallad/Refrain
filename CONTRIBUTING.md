# Contributing to Refrain

Thank you for your interest in contributing to Refrain!

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/BardsBallad/Refrain.git
cd Refrain

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

## Monorepo Structure

This project uses pnpm workspaces and Turbo for monorepo management:

- `packages/core` - Core editor logic (@bardsballad/editor-core)
- `packages/react-renderer` - React UI components (@bardsballad/editor-react)
- `examples/demo` - Demo application

## Development Commands

```bash
# Build all packages
pnpm build

# Run all packages in dev/watch mode
pnpm dev

# Type check all packages
pnpm type-check

# Clean all build artifacts
pnpm clean

# Run the demo app
cd examples/demo && pnpm dev
```

## Making Changes

1. Create a new branch for your feature
2. Make your changes in the appropriate package
3. Ensure all type checks pass: `pnpm type-check`
4. Build all packages: `pnpm build`
5. Test your changes in the demo app
6. Submit a pull request

## Package Development

### Working on @bardsballad/editor-core

```bash
cd packages/core
pnpm dev  # Watch mode
```

### Working on @bardsballad/editor-react

```bash
cd packages/react-renderer
pnpm dev  # Watch mode
```

### Testing in the Demo

The demo app automatically uses the workspace versions of the packages via pnpm workspaces.

## Publishing

Packages are configured for npm publishing under the @bardsballad scope:

```bash
# From package directory
cd packages/core
npm publish

cd ../react-renderer
npm publish
```

## Code Style

- TypeScript strict mode is enabled
- ESM-only modules
- All code must pass type checking
- Follow existing code patterns

## License

MIT - See LICENSE file for details
