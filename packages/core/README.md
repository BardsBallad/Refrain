# @bardsballad/editor-core

Core state management, serialization, and component registry for the Refrain WYSIWYG editor.

## Features

- **State Management**: Manage editor state with immutable operations
- **Serialization**: Serialize and deserialize editor content
- **Component Registry**: Register and manage custom editor components

## Installation

```bash
npm install @bardsballad/editor-core
# or
pnpm add @bardsballad/editor-core
# or
yarn add @bardsballad/editor-core
```

## Usage

```typescript
import { EditorState, ComponentRegistry, serialize, deserialize } from '@bardsballad/editor-core';

// Create editor state
const state = EditorState.create();

// Register components
const registry = new ComponentRegistry();
registry.register('text', TextComponent);

// Serialize content
const json = serialize(state);

// Deserialize content
const restoredState = deserialize(json);
```

## License

MIT
