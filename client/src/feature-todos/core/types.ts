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

export type ValidatedLabel = string;
