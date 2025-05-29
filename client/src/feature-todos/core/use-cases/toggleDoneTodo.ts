import { useCallback } from "react";
import { ToggleCompleteTodo } from "../ports.input";
import { PatchCompleteTodoServer, PatchTodoServer, SaveTodoStore } from "../ports.output";
import { TodoId, TodoState } from "../types";
import { createCheckedTodo } from "../domain/createCheckedTodo";
import { useTodoStoreWriter } from "../../infrastructure/store/todoStore";
import { patchCompleteTodo, patchTodo } from "../../infrastructure/api";

export type ToggleDoneTodo = (id: TodoId, isDone: boolean) => Promise<void>;

type Dependencies = {
    saveTodo: SaveTodoStore;
    patchTodo: PatchTodoServer;
    patchCompleteTodo: PatchCompleteTodoServer;
};

const toggleDoneTodo: ToggleCompleteTodo = async (
    id: TodoId,
    isDone: TodoState,
    { saveTodo, patchTodo, patchCompleteTodo }: Dependencies = {} as Dependencies
) => {
    const checkedTodo = createCheckedTodo(id, isDone);

    try {
        const savedTodo = isDone ? await patchCompleteTodo(id) : await patchTodo(checkedTodo);
        saveTodo(savedTodo);
    } catch (e: any) {
        console.error(e.name || "Unknown Error");
    }
};

export const useToggleDoneTodo = () => {
    const saveTodo = useTodoStoreWriter();
    return useCallback(
        (id: TodoId, isDone: TodoState) => {
            // @ts-expect-error: baking dependencies as poor's man DI container
            toggleDoneTodo(id, isDone, { saveTodo, patchTodo, patchCompleteTodo });
        },
        [saveTodo]
    );
};
