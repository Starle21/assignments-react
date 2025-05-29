import { CheckedRawTodo, TodoId } from "../types";

export type CreateCheckedTodo = (id: TodoId, isDone: boolean) => CheckedRawTodo;

export const createCheckedTodo: CreateCheckedTodo = (id: TodoId, isDone: boolean) => {
    return { id, isDone };
};
