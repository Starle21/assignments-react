import { Todo, TodoId, TodoLabel } from "./types";

const base = "http://localhost:3000";

export const getTodos = async () => {
    const response = await fetch(`${base}/items`);
    const todos = (await response.json()) as Todo[];
    return todos;
};

export const postTodo = async (value: TodoLabel) => {
    const response = await fetch(`${base}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: value, isDone: false }),
    });
    const todo = (await response.json()) as Todo;
    return todo;
};

export const patchTodo = async (id: TodoId, draftTodo: Partial<Todo>) => {
    const response = await fetch(`${base}/items/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(draftTodo),
    });
    const returnedItem = (await response.json()) as Todo;
    return returnedItem;
};

export const patchCompleteTodo = async (id: TodoId) => {
    const response = await fetch(`${base}/items/${id}/done`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const returnedItem = (await response.json()) as Todo;
    return returnedItem;
};

export const deleteTodo = async (id: TodoId) => {
    await fetch(`${base}/items/${id}`, {
        method: "DELETE",
    });
};
