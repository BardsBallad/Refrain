# Refrain

A TypeScript monorepo for a WYSIWYG editor powering BardsBallad character tabs, character builder, and level up wizards.

## 📦 Packages

### [@bardsballad/editor-core](./packages/core)

Core state management, serialization, and component registry for the editor.

- ✅ Immutable state management
- ✅ JSON serialization/deserialization
- ✅ Component registry system
- ✅ TypeScript strict mode
- ✅ ESM-only build

### [@bardsballad/editor-react](./packages/react-renderer)

React renderer with nested drag-and-drop support powered by dnd-kit.

- ✅ React 18+ support
- ✅ Drag-and-drop with dnd-kit
- ✅ Customizable component renderers
- ✅ Full TypeScript support
- ✅ ESM-only build

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Install pnpm if you haven't already
npm install -g pnpm

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Development

```bash
# Run all packages in dev mode
pnpm dev

# Run the demo app
cd examples/demo
pnpm dev
```

## 🏗️ Project Structure

```
Refrain/
├── packages/
│   ├── core/                 # @bardsballad/editor-core
│   │   ├── src/
│   │   │   ├── state.ts     # State management
│   │   │   ├── serialization.ts  # Serialization
│   │   │   ├── registry.ts  # Component registry
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsup.config.ts
│   └── react-renderer/      # @bardsballad/editor-react
│       ├── src/
│       │   ├── EditorContext.tsx  # React context
│       │   ├── Editor.tsx         # Main component
│       │   ├── renderers.tsx      # Component renderers
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── tsup.config.ts
├── examples/
│   └── demo/                # Vite + React demo
│       ├── src/
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── index.css
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
├── package.json
└── README.md
```

## 🛠️ Technologies

- **Monorepo**: pnpm workspaces + Turbo
- **Language**: TypeScript (strict mode)
- **Build**: tsup (ESM-only)
- **React**: React 18+
- **Drag & Drop**: dnd-kit
- **Dev Server**: Vite

## 📝 Scripts

```bash
# Build all packages
pnpm build

# Run in development mode
pnpm dev

# Type check all packages
pnpm type-check

# Lint all packages
pnpm lint

# Clean build artifacts
pnpm clean
```

## 📖 Usage

### Install packages

```bash
npm install @bardsballad/editor-core @bardsballad/editor-react
```

### Basic example

```tsx
import { EditorProvider, Editor } from '@bardsballad/editor-react';
import { createEditorState } from '@bardsballad/editor-core';

function App() {
  const initialState = createEditorState();

  return (
    <EditorProvider initialState={initialState}>
      <Editor />
    </EditorProvider>
  );
}
```

## 🔒 Publishing

Packages are configured for npm publishing with the `@bardsballad` scope:

- `@bardsballad/editor-core`
- `@bardsballad/editor-react`

Both packages are set to `"access": "public"` in their `publishConfig`.

### Publishing to npm

```bash
# Build all packages
pnpm build

# Publish (from each package directory)
cd packages/core
npm publish

cd ../react-renderer
npm publish
```

## 📄 License

MIT © BardsBallad

See [LICENSE](./LICENSE) for more information.
