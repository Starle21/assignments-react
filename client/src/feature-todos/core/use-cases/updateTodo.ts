import { useCallback } from "react";
import { createLabelTodo } from "../domain/createLabelTodo";
import { PatchTodoServer, SaveTodoStore } from "../ports.output";
import { TodoId } from "../types";
import { useTodoStoreWriter } from "../../infrastructure/store/todoStore";
import { patchTodo } from "../../infrastructure/api";

export type UpdateTodo = (id: TodoId, label: string) => Promise<void>;

type Dependencies = {
    saveTodo: SaveTodoStore;
    patchTodo: PatchTodoServer;
};

const updateTodo: UpdateTodo = async (id, rawLabel, { saveTodo, patchTodo }: Dependencies = {} as Dependencies) => {
    // const validatedLabel = validateLabel(rawLabel);
    try {
        const updatedTodo = createLabelTodo(id, rawLabel);
        const savedTodo = (await patchTodo(updatedTodo));
        saveTodo(savedTodo);
    } catch (e: any) {
        console.error(e.name || "Unknown Error");
    }
};

export const useUpdateTodo = () => {
    const saveTodo = useTodoStoreWriter();
    return useCallback(
        (id: TodoId, rawValue: string) => {
            // @ts-expect-error: baking dependencies as poor's man DI container
            updateTodo(id, rawValue, { saveTodo, patchTodo });
        },
        [saveTodo]
    );
};