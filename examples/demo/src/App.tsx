import { useState } from 'react';
import {
  EditorProvider,
  Editor,
  useEditorState,
  useEditorDispatch,
} from '@bardsballad/editor-react';
import {
  createEditorState,
  generateId,
  serialize,
  deserialize,
  type EditorNode,
} from '@bardsballad/editor-core';

function EditorControls() {
  const state = useEditorState();
  const dispatch = useEditorDispatch();

  const addTextNode = () => {
    const newNode: EditorNode = {
      id: generateId(),
      type: 'text',
      data: { text: 'New text node' },
    };
    dispatch({
      type: 'INSERT_NODE',
      payload: { parentId: state.root.id, node: newNode },
    });
  };

  const addHeadingNode = () => {
    const newNode: EditorNode = {
      id: generateId(),
      type: 'heading',
      data: { level: 2, text: 'New Heading' },
      children: [],
    };
    dispatch({
      type: 'INSERT_NODE',
      payload: { parentId: state.root.id, node: newNode },
    });
  };

  const addImageNode = () => {
    const newNode: EditorNode = {
      id: generateId(),
      type: 'image',
      data: {
        src: 'https://via.placeholder.com/400x300',
        alt: 'Placeholder image',
      },
    };
    dispatch({
      type: 'INSERT_NODE',
      payload: { parentId: state.root.id, node: newNode },
    });
  };

  const addButtonNode = () => {
    const newNode: EditorNode = {
      id: generateId(),
      type: 'button',
      data: { text: 'Click me!', action: 'alert' },
    };
    dispatch({
      type: 'INSERT_NODE',
      payload: { parentId: state.root.id, node: newNode },
    });
  };

  const exportJson = () => {
    const json = serialize(state);
    console.log('Exported JSON:', json);
    alert('JSON exported to console');
  };

  const importJson = () => {
    const json = prompt('Paste JSON to import:');
    if (json) {
      try {
        const newState = deserialize(json);
        dispatch({ type: 'SET_STATE', payload: newState });
        alert('JSON imported successfully');
      } catch (error) {
        alert(`Failed to import: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  };

  return (
    <div className="controls">
      <button onClick={addTextNode}>Add Text</button>
      <button onClick={addHeadingNode}>Add Heading</button>
      <button onClick={addImageNode}>Add Image</button>
      <button onClick={addButtonNode}>Add Button</button>
      <button onClick={exportJson}>Export JSON</button>
      <button onClick={importJson}>Import JSON</button>
    </div>
  );
}

function EditorWrapper() {
  return (
    <>
      <EditorControls />
      <div className="editor-container">
        <Editor enableDragDrop={true} />
      </div>
    </>
  );
}

function App() {
  const [initialState] = useState(() => {
    const state = createEditorState();
    
    // Add some initial content
    const heading: EditorNode = {
      id: generateId(),
      type: 'heading',
      data: { level: 1, text: 'Welcome to Refrain Editor' },
      children: [],
    };
    
    const text1: EditorNode = {
      id: generateId(),
      type: 'text',
      data: { text: 'This is a demonstration of the Refrain WYSIWYG editor.' },
    };
    
    const text2: EditorNode = {
      id: generateId(),
      type: 'text',
      data: { text: 'Try adding components using the buttons above!' },
    };

    state.root.children = [heading, text1, text2];
    return state;
  });

  return (
    <div>
      <h1>Refrain Editor Demo</h1>
      <p>
        A TypeScript monorepo for a WYSIWYG editor with nested drag-and-drop support.
      </p>
      <EditorProvider initialState={initialState}>
        <EditorWrapper />
      </EditorProvider>
    </div>
  );
}

export default App;
