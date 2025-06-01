import {
    GetTodosServer,
    PostTodoServer,
    FullTodo,
    TodoId,
    PatchCompleteTodoServer,
    DeleteTodoServer,
    PatchTodoServer,
} from "./user-interactions/types";

const base = "http://localhost:3000";

export const getTodos: GetTodosServer = async () => {
    const response = await fetch(`${base}/items`);
    const todos = (await response.json()) as FullTodo[];
    return todos;
};

export const postTodo: PostTodoServer = async (draftTodo: Partial<FullTodo>) => {
    const response = await fetch(`${base}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(draftTodo),
    });
    const todo = (await response.json()) as FullTodo;
    return todo;
};

export const patchTodo: PatchTodoServer = async (draftTodo: Partial<FullTodo>) => {
    const response = await fetch(`${base}/items/${draftTodo.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(draftTodo),
    });
    const returnedItem = (await response.json()) as FullTodo;
    return returnedItem;
};

export const patchCompleteTodo: PatchCompleteTodoServer = async (id: TodoId) => {
    const response = await fetch(`${base}/items/${id}/done`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const returnedItem = (await response.json()) as FullTodo;
    return returnedItem;
};

export const deleteTodo: DeleteTodoServer = async (id: TodoId) => {
    await fetch(`${base}/items/${id}`, {
        method: "DELETE",
    });
};
