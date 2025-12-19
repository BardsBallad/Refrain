# @bardsballad/editor-react

React renderer with nested drag-and-drop support for the Refrain WYSIWYG editor.

## Features

- **React Components**: Pre-built React components for rendering editor content
- **Drag & Drop**: Powered by dnd-kit for smooth nested drag-and-drop interactions
- **Customizable**: Easy to extend with custom component renderers
- **Type-safe**: Full TypeScript support with strict typing

## Installation

```bash
npm install @bardsballad/editor-react @bardsballad/editor-core react react-dom
# or
pnpm add @bardsballad/editor-react @bardsballad/editor-core react react-dom
# or
yarn add @bardsballad/editor-react @bardsballad/editor-core react react-dom
```

## Usage

```tsx
import { Editor, EditorProvider } from '@bardsballad/editor-react';
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

### Custom Component Renderers

```tsx
import { Editor, EditorProvider, registerRenderer } from '@bardsballad/editor-react';

// Register a custom renderer
registerRenderer('custom-type', ({ node, children }) => (
  <div className="custom-component">
    <h3>{node.data?.title}</h3>
    {children}
  </div>
));

function App() {
  return (
    <EditorProvider initialState={initialState}>
      <Editor />
    </EditorProvider>
  );
}
```

## Peer Dependencies

- react ^18.0.0
- react-dom ^18.0.0

## License

MIT
