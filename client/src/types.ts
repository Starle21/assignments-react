export type Todo = {
    id: TodoId;
    label: TodoLabel;
    isDone: TodoState;
    createdAt: TodoCreatedTime;
};

export type TodoId = number;
export type TodoLabel = string;
export type TodoCreatedTime = number;
export type TodoState = Checked | NotFinished;
export type Checked = true;
export type NotFinished = false;
