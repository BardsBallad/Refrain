import React, { type ReactNode } from 'react';
import type { EditorNode } from '@bardsballad/editor-core';

/**
 * Component renderer type
 */
export type ComponentRenderer = (props: {
  node: EditorNode;
  children?: ReactNode;
}) => React.ReactElement | null;

/**
 * Global component renderer registry
 */
const renderers = new Map<string, ComponentRenderer>();

/**
 * Register a custom component renderer
 */
export function registerRenderer(type: string, renderer: ComponentRenderer): void {
  renderers.set(type, renderer);
}

/**
 * Unregister a component renderer
 */
export function unregisterRenderer(type: string): boolean {
  return renderers.delete(type);
}

/**
 * Get a component renderer by type
 */
export function getRenderer(type: string): ComponentRenderer | undefined {
  return renderers.get(type);
}

/**
 * Default text component renderer
 */
function TextRenderer({ node }: { node: EditorNode }) {
  return <p>{String(node.data?.text ?? '')}</p>;
}

/**
 * Default heading component renderer
 */
function HeadingRenderer({ node, children }: { node: EditorNode; children?: ReactNode }) {
  const level = (node.data?.level as number) ?? 1;
  const Tag = `h${Math.min(Math.max(level, 1), 6)}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return <Tag>{children ?? String(node.data?.text ?? '')}</Tag>;
}

/**
 * Default image component renderer
 */
function ImageRenderer({ node }: { node: EditorNode }) {
  return (
    <img
      src={String(node.data?.src ?? '')}
      alt={String(node.data?.alt ?? '')}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
}

/**
 * Default button component renderer
 */
function ButtonRenderer({ node }: { node: EditorNode }) {
  return <button type="button">{String(node.data?.text ?? 'Button')}</button>;
}

/**
 * Default container component renderer
 */
function ContainerRenderer({ node, children }: { node: EditorNode; children?: ReactNode }) {
  return (
    <div data-node-id={node.id} data-node-type={node.type}>
      {children}
    </div>
  );
}

// Register default renderers
registerRenderer('text', TextRenderer);
registerRenderer('heading', HeadingRenderer);
registerRenderer('image', ImageRenderer);
registerRenderer('button', ButtonRenderer);
registerRenderer('root', ContainerRenderer);
