import { Todo, TodoId, TodoLabel } from "./types";

const base = "http://localhost:3000";

export const getTodos = async () => {
    try {
        const response = await fetch(`${base}/items`);
        const todos = (await response.json()) as Todo[];
        return todos;
    } catch (e: any) {
        console.error(e.name || "Unknown Error");
    }
};

export const postTodo = async (value: TodoLabel) => {
    try {
        const response = await fetch(`${base}/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ label: value, isDone: false }),
        });
        const todo = (await response.json()) as Todo;
        return todo;
    } catch (e: any) {
        console.error(e.name || "Unknown Error");
    }
};

export const patchTodo = async (id: TodoId, draftTodo: Partial<Todo>) => {
    try {
        const response = await fetch(`${base}/items/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(draftTodo),
        });
        const returnedItem = (await response.json()) as Todo;
        return returnedItem;
    } catch (e: any) {
        console.error(e.name || "Unknown Error");
    }
};

export const patchCompleteTodo = async (id: TodoId) => {
    try {
        const response = await fetch(`${base}/items/${id}/done`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const returnedItem = (await response.json()) as Todo;
        return returnedItem;
    } catch (e: any) {
        console.error(e.name || "Unknown Error");
    }
};

export const deleteTodo = async (id: TodoId) => {
    try {
        await fetch(`${base}/items/${id}`, {
            method: "DELETE",
        });
    } catch (e: any) {
        console.error(e.name || "Unknown Error");
    }
};
