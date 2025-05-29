import { LabelRawTodo, TodoId } from "../types";

export type CreateLabelTodo = (id: TodoId, label: string) => LabelRawTodo;

export const createLabelTodo: CreateLabelTodo = (id: TodoId, label: string) => {
    return { id, label };
};