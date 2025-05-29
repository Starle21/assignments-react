import { CountedTodos, FullTodo } from "../types";

export type CountTodos = (items: FullTodo[]) => CountedTodos;

export const countTodos = (items: FullTodo[]) => {
    const doneItems = items.filter((item) => item.isDone).length;
    const todoItems = items.length - doneItems;
    return { done: doneItems, todo: todoItems };
};
