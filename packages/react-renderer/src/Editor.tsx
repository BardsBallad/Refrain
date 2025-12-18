import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { EditorNode } from '@bardsballad/editor-core';
import { useEditor } from './EditorContext';
import { getRenderer } from './renderers';

/**
 * Node renderer component
 */
interface NodeRendererProps {
  node: EditorNode;
  enableDragDrop?: boolean;
}

function NodeRenderer({ node, enableDragDrop = true }: NodeRendererProps) {
  const renderer = getRenderer(node.type);
  
  // Render children recursively
  const children = node.children?.map((child: EditorNode) => (
    <NodeRenderer key={child.id} node={child} enableDragDrop={enableDragDrop} />
  ));

  const content = renderer
    ? renderer({ node, children })
    : (
      <div data-node-type={node.type}>
        {children}
      </div>
    );

  // Wrap in sortable if drag-drop is enabled and node has siblings
  if (enableDragDrop && node.children && node.children.length > 1) {
    return (
      <SortableContext
        items={node.children.map((child: EditorNode) => child.id)}
        strategy={verticalListSortingStrategy}
      >
        {content}
      </SortableContext>
    );
  }

  return content;
}

/**
 * Editor component props
 */
interface EditorProps {
  className?: string;
  enableDragDrop?: boolean;
  onDragEnd?: (activeId: string, overId: string) => void;
}

/**
 * Main editor component
 */
export function Editor({ className, enableDragDrop = true, onDragEnd }: EditorProps) {
  const { state } = useEditor();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // Notify parent component of drag event
      onDragEnd?.(String(active.id), String(over.id));
      // Note: Full implementation would need to:
      // 1. Find the parent of both nodes
      // 2. Reorder children in the parent
      // 3. Dispatch an update action
    }
  };

  const content = <NodeRenderer node={state.root} enableDragDrop={enableDragDrop} />;

  if (!enableDragDrop) {
    return <div className={className}>{content}</div>;
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className={className}>{content}</div>
    </DndContext>
  );
}
