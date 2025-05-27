import { Todo } from "./types";

export const getTodos = async () => {
    const response = await fetch("http://localhost:3000/items");
    const todos = (await response.json()) as Todo[];
    return todos
}

export const postTodo = async (value: string) => {
    const response = await fetch("http://localhost:3000/items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: value, isDone: false }),
    });
    const todo = (await response.json()) as Todo;
    return todo;
}