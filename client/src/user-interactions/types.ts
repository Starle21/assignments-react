// Domain types
export type TodoId = number;
export type TodoLabel = string;
export type TodoCreatedTime = number;
export type TodoState = Checked | NotFinished;
export type Checked = true;
export type NotFinished = false;

export type FullTodo = {
    id: TodoId;
    label: TodoLabel;
    isDone: TodoState;
    createdAt: TodoCreatedTime;
};

export type RawTodo = NewRawTodo | LabelRawTodo | CheckedRawTodo;

export type NewRawTodo = {
    label: TodoLabel;
    isDone: NotFinished;
};
export type LabelRawTodo = {
    id: TodoId;
    label: TodoLabel;
};
export type CheckedRawTodo = {
    id: TodoId;
    isDone: TodoState;
};

export type Todo = FullTodo | RawTodo;

export type CountedTodos = {
    done: number;
    todo: number;
};

// Shared
export type Nullable<T> = T | null;
export type Provider<T> = () => T;
export type Optional<T> = T | undefined;

// Use Cases - input ports to core
export type InitializeTodos = () => Promise<void>;
export type CreateTodo = (label: string) => Promise<void>;
export type UpdateTodo = (id: TodoId, label: string) => Promise<void>;
export type DeleteTodo = (id: TodoId) => Promise<void>;
export type ToggleDoneTodo = (id: TodoId, isDone: boolean) => Promise<void>;

// User Interactions
export type CancelTodo = () => void;
export type AddTodo = (label: string) => void;
export type EditTodo = (id: TodoId) => (label: string) => void;
export type RemoveTodo = (id: TodoId) => () => void;
export type ToggleCheckTodo = (id: TodoId) => (isDone: boolean) => void;

export type UserInteraction = {
    addTodo: AddTodo;
    cancelTodo: CancelTodo;
    editTodo: EditTodo;
    removeTodo: RemoveTodo;
    toggleCheckTodo: ToggleCheckTodo;
};

// Infrastructure - output ports to core
export type SaveTodoStore = (patch: FullTodo | FullTodo[]) => void;
export type RemoveOneTodoFromStore = (id: TodoId) => void;

export type GetTodosServer = () => Promise<FullTodo[]>;
export type PostTodoServer = (todo: Partial<FullTodo>) => Promise<FullTodo>;
export type PatchTodoServer = (value: Partial<FullTodo>) => Promise<FullTodo>;
export type DeleteTodoServer = (id: TodoId) => Promise<void>;
export type PatchCompleteTodoServer = (id: TodoId) => Promise<FullTodo>;
export type PatchToggleTodoServer = (todo: Partial<FullTodo>) => Promise<FullTodo>;

// Domain functions
export type CreateDraftTodo = (label: string) => NewRawTodo;
export type CreateLabelTodo = (id: TodoId, label: string) => LabelRawTodo;
export type CreateCheckedTodo = (id: TodoId, isDone: boolean) => CheckedRawTodo;

// Pure functions
export type SortTodos = (todos: FullTodo[]) => FullTodo[];
export type CountTodos = (items: FullTodo[]) => CountedTodos;
