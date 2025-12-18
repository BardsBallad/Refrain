import type { EditorState, EditorNode } from './state';

/**
 * Serialized editor state format
 */
export interface SerializedState {
  version: string;
  content: EditorNode;
}

/**
 * Serialize editor state to JSON
 */
export function serialize(state: EditorState): string {
  const serialized: SerializedState = {
    version: '1.0.0',
    content: state.root,
  };
  return JSON.stringify(serialized, null, 2);
}

/**
 * Deserialize JSON to editor state
 */
export function deserialize(json: string): EditorState {
  try {
    const parsed = JSON.parse(json) as SerializedState;
    
    if (!parsed.content || typeof parsed.content !== 'object') {
      throw new Error('Invalid serialized state: missing or invalid content');
    }
    
    return {
      root: parsed.content,
    };
  } catch (error) {
    throw new Error(`Failed to deserialize editor state: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Export editor state to a portable format
 */
export function exportToFormat(state: EditorState, format: 'json' | 'html'): string {
  switch (format) {
    case 'json':
      return serialize(state);
    case 'html':
      return nodeToHtml(state.root);
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}

/**
 * Convert editor node to HTML
 */
function nodeToHtml(node: EditorNode): string {
  const children = node.children?.map(nodeToHtml).join('') ?? '';
  
  switch (node.type) {
    case 'root':
      return `<div class="editor-root">${children}</div>`;
    case 'text':
      return `<p>${node.data?.text ?? ''}</p>`;
    case 'heading':
      const level = (node.data?.level as number) ?? 1;
      return `<h${level}>${children}</h${level}>`;
    default:
      return `<div data-type="${node.type}">${children}</div>`;
  }
}
