/**
 * Unique identifier type for editor nodes
 */
export type NodeId = string;

/**
 * Base editor node interface
 */
export interface EditorNode {
  id: NodeId;
  type: string;
  children?: EditorNode[];
  data?: Record<string, unknown>;
}

/**
 * Editor state containing document structure
 */
export interface EditorState {
  root: EditorNode;
  selection?: {
    nodeId: NodeId;
    offset?: number;
  };
}

/**
 * Create a new editor state with an empty root node
 */
export function createEditorState(): EditorState {
  return {
    root: {
      id: generateId(),
      type: 'root',
      children: [],
    },
  };
}

/**
 * Generate a unique identifier
 */
export function generateId(): NodeId {
  return `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Find a node by ID in the editor state
 */
export function findNodeById(
  state: EditorState,
  nodeId: NodeId
): EditorNode | undefined {
  const search = (node: EditorNode): EditorNode | undefined => {
    if (node.id === nodeId) {
      return node;
    }
    if (node.children) {
      for (const child of node.children) {
        const result = search(child);
        if (result) {
          return result;
        }
      }
    }
    return undefined;
  };
  return search(state.root);
}

/**
 * Insert a node as a child of the specified parent
 */
export function insertNode(
  state: EditorState,
  parentId: NodeId,
  node: EditorNode,
  index?: number
): EditorState {
  const newRoot = cloneNode(state.root);
  const parent = findNodeInTree(newRoot, parentId);
  
  if (!parent) {
    throw new Error(`Parent node with id ${parentId} not found`);
  }
  
  if (!parent.children) {
    parent.children = [];
  }
  
  if (index === undefined || index >= parent.children.length) {
    parent.children.push(node);
  } else {
    parent.children.splice(index, 0, node);
  }
  
  return { ...state, root: newRoot };
}

/**
 * Remove a node from the editor state
 */
export function removeNode(state: EditorState, nodeId: NodeId): EditorState {
  const newRoot = cloneNode(state.root);
  removeNodeFromTree(newRoot, nodeId);
  return { ...state, root: newRoot };
}

/**
 * Update a node's data
 */
export function updateNode(
  state: EditorState,
  nodeId: NodeId,
  data: Partial<EditorNode>
): EditorState {
  const newRoot = cloneNode(state.root);
  const node = findNodeInTree(newRoot, nodeId);
  
  if (!node) {
    throw new Error(`Node with id ${nodeId} not found`);
  }
  
  Object.assign(node, data);
  return { ...state, root: newRoot };
}

// Helper functions
function cloneNode(node: EditorNode): EditorNode {
  const cloned: EditorNode = {
    id: node.id,
    type: node.type,
  };
  
  if (node.children !== undefined) {
    cloned.children = node.children.map(cloneNode);
  }
  
  if (node.data !== undefined) {
    cloned.data = { ...node.data };
  }
  
  return cloned;
}

function findNodeInTree(node: EditorNode, nodeId: NodeId): EditorNode | undefined {
  if (node.id === nodeId) {
    return node;
  }
  if (node.children) {
    for (const child of node.children) {
      const result = findNodeInTree(child, nodeId);
      if (result) {
        return result;
      }
    }
  }
  return undefined;
}

function removeNodeFromTree(parent: EditorNode, nodeId: NodeId): boolean {
  if (!parent.children) {
    return false;
  }
  
  const index = parent.children.findIndex((child) => child.id === nodeId);
  if (index !== -1) {
    parent.children.splice(index, 1);
    return true;
  }
  
  for (const child of parent.children) {
    if (removeNodeFromTree(child, nodeId)) {
      return true;
    }
  }
  
  return false;
}
