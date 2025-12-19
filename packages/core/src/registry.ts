/**
 * Component definition interface
 */
export interface ComponentDefinition {
  type: string;
  displayName: string;
  icon?: string;
  defaultData?: Record<string, unknown>;
  schema?: Record<string, unknown>;
}

/**
 * Component registry for managing editor components
 */
export class ComponentRegistry {
  private components = new Map<string, ComponentDefinition>();

  /**
   * Register a new component type
   */
  register(definition: ComponentDefinition): void {
    if (this.components.has(definition.type)) {
      throw new Error(`Component type "${definition.type}" is already registered`);
    }
    this.components.set(definition.type, definition);
  }

  /**
   * Unregister a component type
   */
  unregister(type: string): boolean {
    return this.components.delete(type);
  }

  /**
   * Get a component definition by type
   */
  get(type: string): ComponentDefinition | undefined {
    return this.components.get(type);
  }

  /**
   * Check if a component type is registered
   */
  has(type: string): boolean {
    return this.components.has(type);
  }

  /**
   * Get all registered component types
   */
  getAll(): ComponentDefinition[] {
    return Array.from(this.components.values());
  }

  /**
   * Get all registered component types as a list of type names
   */
  getTypes(): string[] {
    return Array.from(this.components.keys());
  }

  /**
   * Clear all registered components
   */
  clear(): void {
    this.components.clear();
  }

  /**
   * Create a component registry from a list of definitions
   */
  static from(definitions: ComponentDefinition[]): ComponentRegistry {
    const registry = new ComponentRegistry();
    for (const definition of definitions) {
      registry.register(definition);
    }
    return registry;
  }
}

/**
 * Create a default component registry with common components
 */
export function createDefaultRegistry(): ComponentRegistry {
  const registry = new ComponentRegistry();
  
  registry.register({
    type: 'text',
    displayName: 'Text',
    icon: '📝',
    defaultData: { text: '' },
  });
  
  registry.register({
    type: 'heading',
    displayName: 'Heading',
    icon: '📰',
    defaultData: { level: 1, text: '' },
  });
  
  registry.register({
    type: 'image',
    displayName: 'Image',
    icon: '🖼️',
    defaultData: { src: '', alt: '' },
  });
  
  registry.register({
    type: 'button',
    displayName: 'Button',
    icon: '🔘',
    defaultData: { text: 'Click me', action: '' },
  });
  
  return registry;
}
