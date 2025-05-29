import { useCallback } from "react";
import { createNewRawTodo } from "../domain/createDraftTodo";
import { PostTodoServer, SaveTodoStore } from "../ports.output";
import { useTodoStoreWriter } from "../../infrastructure/store/todoStore";
import { postTodo } from "../../infrastructure/api";
import { validateLabel } from "../domain/validateLabel";

export type CreateTodo = (label: string) => Promise<void>;

type Dependencies = {
    saveTodo: SaveTodoStore;
    postTodo: PostTodoServer;
};

const createTodo: CreateTodo = async (rawLabel, { saveTodo, postTodo }: Dependencies = {} as Dependencies) => {
    const validatedLabel = validateLabel(rawLabel);

    try {
        const newTodo = createNewRawTodo(validatedLabel);
        const todo = (await postTodo(newTodo));
        saveTodo(todo);
    } catch (e: any) {
        console.error(e.name || "Unknown Error");
    }

};

export const useCreateTodo = () => {
    const saveTodo = useTodoStoreWriter();
    return useCallback(
        (rawValue: string) => {
            // @ts-expect-error: baking dependencies as poor's man DI container
            createTodo(rawValue, { saveTodo, postTodo });
        },
        [saveTodo]
    );
};
