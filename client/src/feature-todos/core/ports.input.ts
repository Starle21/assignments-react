// Use Cases - input ports to core
export type InitializeTodos = () => Promise<void>;
export type CreateTodo = (label: string) => Promise<void>;
export type UpdateTodo = (id: TodoId, label: string) => Promise<void>;
export type DeleteTodo = (id: TodoId) => Promise<void>;
export type ToggleCompleteTodo = (id: TodoId, isDone: boolean) => Promise<void>;