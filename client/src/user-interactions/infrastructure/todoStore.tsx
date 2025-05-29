import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";
import { CountedTodos, Nullable, Provider, RemoveOneTodoFromStore, SaveTodoStore, FullTodo, TodoId } from "../types";
import { countTodos, sortTodos } from "../core";

// ===
type TodoApi = {
    saveTodo: SaveTodoStore;
    removeTodo: RemoveOneTodoFromStore;
};

type TodoStore = FullTodo[];
// ===

const initialCounts = { done: 0, todo: 0 };

const TodoContext = createContext<Nullable<TodoStore>>(null);
const TodoApiContext = createContext<Nullable<TodoApi>>(null);
const CountsContext = createContext<CountedTodos>(initialCounts);

export const useTodoStore = () => useContext(TodoContext)!;
const useTodoApi = () => useContext(TodoApiContext)!;

export const useTodosStore = () => useContext(TodoContext);
export const useCountsStore = () => useContext(CountsContext);

export const useTodoStoreWriter: Provider<SaveTodoStore> = () => useTodoApi().saveTodo;
export const useTodosStoreRemover: Provider<(id: TodoId) => void> = () => useTodoApi().removeTodo;

export const TodoStore = ({ children }: PropsWithChildren) => {
    const [todos, setTodos] = useState<FullTodo[]>([]);

    const sortedTodos = useMemo(() => {
        return sortTodos(todos);
    }, [todos]);

    const apiCounts = useMemo(() => {
        return countTodos(todos);
    }, [todos]);

    const todoApi = useMemo(() => {
        const saveTodo = (toSave: FullTodo | FullTodo[]) => {
            if (Array.isArray(toSave)) setTodos(toSave);
            else {
                setTodos((previous) => {
                    const found = previous.some((el) => {
                        return el.id === toSave.id;
                    });
                    if (found) {
                        return previous.map((stored) => (stored.id === toSave.id ? toSave : stored));
                    } else {
                        return [...previous, toSave];
                    }
                });
            }
        };
        const removeTodo = (id: TodoId) => {
            setTodos((previous) => previous.filter((todo) => todo.id !== id));
        };
        return { saveTodo, removeTodo };
    }, []);

    return (
        <TodoContext.Provider value={sortedTodos}>
            <TodoApiContext.Provider value={todoApi}>
                <CountsContext.Provider value={apiCounts}>{children}</CountsContext.Provider>
            </TodoApiContext.Provider>
        </TodoContext.Provider>
    );
};
