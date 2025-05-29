import { FullTodo } from "../types";

export type SortTodos = (todos: FullTodo[]) => FullTodo[];

// "donelast-descending"
export const sortTodos = (todos: FullTodo[]) => {
    const doneItems = todos.filter((todo) => todo.isDone).sort((a, b) => b.createdAt - a.createdAt);
    const todoItems = todos.filter((todo) => !todo.isDone).sort((a, b) => b.createdAt - a.createdAt);
    return [...todoItems, ...doneItems];
};
