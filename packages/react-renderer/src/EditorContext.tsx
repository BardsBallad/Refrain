import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { EditorState, EditorNode, NodeId } from '@bardsballad/editor-core';
import {
  createEditorState,
  insertNode,
  removeNode,
  updateNode,
} from '@bardsballad/editor-core';

/**
 * Editor action types
 */
type EditorAction =
  | { type: 'SET_STATE'; payload: EditorState }
  | { type: 'INSERT_NODE'; payload: { parentId: NodeId; node: EditorNode; index?: number } }
  | { type: 'REMOVE_NODE'; payload: { nodeId: NodeId } }
  | { type: 'UPDATE_NODE'; payload: { nodeId: NodeId; data: Partial<EditorNode> } }
  | { type: 'SET_SELECTION'; payload: { nodeId?: NodeId; offset?: number } };

/**
 * Editor context type
 */
interface EditorContextType {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

/**
 * Editor reducer
 */
function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload;
    case 'INSERT_NODE':
      return insertNode(state, action.payload.parentId, action.payload.node, action.payload.index);
    case 'REMOVE_NODE':
      return removeNode(state, action.payload.nodeId);
    case 'UPDATE_NODE':
      return updateNode(state, action.payload.nodeId, action.payload.data);
    case 'SET_SELECTION': {
      if (!action.payload.nodeId) {
        // Return state without selection property
        const newState: EditorState = { root: state.root };
        return newState;
      }
      const selection: { nodeId: NodeId; offset?: number } = {
        nodeId: action.payload.nodeId,
      };
      if (action.payload.offset !== undefined) {
        selection.offset = action.payload.offset;
      }
      return { ...state, selection };
    }
    default:
      return state;
  }
}

/**
 * Editor provider props
 */
interface EditorProviderProps {
  children: ReactNode;
  initialState?: EditorState;
  onChange?: (state: EditorState) => void;
}

/**
 * Editor provider component
 */
export function EditorProvider({ children, initialState, onChange }: EditorProviderProps) {
  const [state, dispatch] = useReducer(
    editorReducer,
    initialState ?? createEditorState()
  );

  React.useEffect(() => {
    onChange?.(state);
  }, [state, onChange]);

  const value = React.useMemo(() => ({ state, dispatch }), [state]);

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}

/**
 * Hook to access editor context
 */
export function useEditor(): EditorContextType {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}

/**
 * Hook to access editor state
 */
export function useEditorState(): EditorState {
  const { state } = useEditor();
  return state;
}

/**
 * Hook to access editor dispatch
 */
export function useEditorDispatch(): React.Dispatch<EditorAction> {
  const { dispatch } = useEditor();
  return dispatch;
}
