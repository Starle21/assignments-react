import { NewRawTodo } from "../types";

export type CreateDraftTodo = (label: string) => NewRawTodo;

export const createNewRawTodo: CreateDraftTodo = (label: string) => {
    return { label, isDone: false };
};
