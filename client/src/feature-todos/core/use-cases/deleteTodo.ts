import { useCallback } from "react";
import { DeleteTodoServer, RemoveOneTodoFromStore } from "../ports.output";
import { TodoId } from "../types";
import { useTodoStoreRemover } from "../../infrastructure/store/todoStore";
import { deleteTodoServer } from "../../infrastructure/api";

export type DeleteTodo = (id: TodoId) => Promise<void>;

type Dependencies = {
    removeTodo: RemoveOneTodoFromStore;
    deleteTodoServer: DeleteTodoServer;
};

const deleteTodo: DeleteTodo = async (id, { removeTodo, deleteTodoServer }: Dependencies = {} as Dependencies) => {
    try {
        await deleteTodoServer(id);
        removeTodo(id);
    } catch (e: any) {
        console.error(e.name || "Unknown Error");
    }
};

export const useDeleteTodo = () => {
    const removeTodo = useTodoStoreRemover();

    return useCallback(
        (id: TodoId) => {
            // @ts-expect-error: baking dependencies as poor's man DI container
            deleteTodo(id, { removeTodo, deleteTodoServer });
        },
        [removeTodo]
    );
};
