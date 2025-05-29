import { useEffect } from "react";
import { useTodoStoreWriter } from "./infrastructure/todoStore";
import { getTodos } from "../api";
import { FullTodo } from "./types";

export type InitializeTodos = () => Promise<void>;

export const useInitializeTodos = () => {
    const saveTodos = useTodoStoreWriter();

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const todos = (await getTodos()) as FullTodo[]; //CORE
                saveTodos(todos); //CORE
            } catch (e: any) {
                console.error(e.name || "Unknown Error");
            }
        };
        makeRequest();
    }, []);
};
