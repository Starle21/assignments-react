import { FC, useMemo } from "react";
import { Footer } from "../components/Footer";
import { Todo } from "../types";

const countTodos = (items: Todo[]) => {
    const doneItems = items.filter((item) => item.isDone).length;
    const todoItems = items.length - doneItems;
    return { done: doneItems, todo: todoItems };
};

type TodoStatisticsProp = {
    todos: Todo[];
};

export const TodoStatistics: FC<TodoStatisticsProp> = ({ todos }) => {
    const countedTodos = useMemo(() => {
        return countTodos(todos);
    }, [todos]);

    return <Footer todoItems={countedTodos.todo} doneItems={countedTodos.done} />;
};
