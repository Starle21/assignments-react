import { useEffect } from "react";
import { GetTodosServer, SaveTodoStore } from "../ports.output";
import { useTodoStoreWriter } from "../../infrastructure/store/todoStore";
import { getTodos } from "../../infrastructure/api";

export type InitializeTodos = () => Promise<void>;

type Dependencies = {
    saveTodos: SaveTodoStore;
    requestTodos: GetTodosServer;
};

export const initializeTodos: InitializeTodos = async (
    { saveTodos, requestTodos }: Dependencies = {} as Dependencies
) => {
    try {
        const serverTodos = await requestTodos();
        saveTodos(serverTodos);
    } catch (e: any) {
        console.error(e.name || "Unknown Error");
    }
};

export const useInitializeTodos = () => {
    const saveTodos = useTodoStoreWriter();
    useEffect(() => {
        // @ts-expect-error: baking dependencies as poor's man DI container
        initializeTodos({ saveTodos, requestTodos: getTodos });
    }, []);
};
