import { FullTodo, TodoId } from "./types";

// Runtime store
export type SaveTodoStore = (patch: FullTodo | FullTodo[]) => void;
export type RemoveOneTodoFromStore = (id: TodoId) => void;

// Network
export type GetTodosServer = () => Promise<FullTodo[]>;
export type PostTodoServer = (todo: Partial<FullTodo>) => Promise<FullTodo>;
export type PatchTodoServer = (value: Partial<FullTodo>) => Promise<FullTodo>;
export type DeleteTodoServer = (id: TodoId) => Promise<void>;
export type PatchCompleteTodoServer = (id: TodoId) => Promise<FullTodo>;