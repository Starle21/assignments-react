import { CreateCheckedTodo, CreateDraftTodo, CreateLabelTodo, FullTodo, TodoId } from "./types";

export const createNewRawTodo: CreateDraftTodo = (label: string) => {
    return { label, isDone: false };
};
export const createLabelTodo: CreateLabelTodo = (id: TodoId, label: string) => {
    return { id, label };
};
export const createCheckedTodo: CreateCheckedTodo = (id: TodoId, isDone: boolean) => {
    return { id, isDone };
};

export const countTodos = (items: FullTodo[]) => {
    const doneItems = items.filter((item) => item.isDone).length;
    const todoItems = items.length - doneItems;
    return { done: doneItems, todo: todoItems };
};

// "donelast-descending"
export const sortTodos = (todos: FullTodo[]) => {
    const doneItems = todos.filter((todo) => todo.isDone).sort((a, b) => b.createdAt - a.createdAt);
    const todoItems = todos.filter((todo) => !todo.isDone).sort((a, b) => b.createdAt - a.createdAt);
    return [...todoItems, ...doneItems];
};