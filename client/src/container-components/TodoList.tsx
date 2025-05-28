import { FC, useMemo } from "react";
import { deleteTodo, patchCompleteTodo, patchTodo } from "../api";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { Todo, TodoId, TodoLabel, TodoState } from "../types";
import { SubmitAction } from "../App";
import { AnimatePresence, motion } from "framer-motion";

// "donelast-descending"
const sortTodos = (todos: Todo[]) => {
    const doneItems = todos.filter((todo) => todo.isDone).sort((a, b) => b.createdAt - a.createdAt);
    const todoItems = todos.filter((todo) => !todo.isDone).sort((a, b) => b.createdAt - a.createdAt);
    return [...todoItems, ...doneItems];
};

export type TodoListProp = {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    toggleFormVisible: () => void;
    setInitialFormValue: React.Dispatch<React.SetStateAction<string>>;
    setActionToSubmit: React.Dispatch<React.SetStateAction<SubmitAction>>;
};

export const TodoList: FC<TodoListProp> = ({
    todos,
    setTodos,
    toggleFormVisible,
    setInitialFormValue,
    setActionToSubmit,
}) => {
    const removeTodo = (id: TodoId) => async () => {
        await deleteTodo(id);
        setTodos((previous) => previous.filter((todo) => todo.id !== id));
    };
    const editTodo = (id: TodoId) => (label: TodoLabel) => {
        setInitialFormValue(label);
        setActionToSubmit(() => (newLabel: TodoLabel) => submitPatchTodo(id, newLabel));
        toggleFormVisible();
    };
    const submitPatchTodo = async (id: TodoId, label: TodoLabel) => {
        const savedTodo = await patchTodo(id, { label });
        setTodos((previous) => previous.map((stored) => (stored.id === savedTodo.id ? savedTodo : stored)));
        toggleFormVisible();
    };
    const toggleDoneTodo = (id: TodoId) => async (isDone: TodoState) => {
        const savedTodo = isDone ? await patchCompleteTodo(id) : await patchTodo(id, { isDone });
        setTodos((previous) => previous.map((stored) => (stored.id === savedTodo.id ? savedTodo : stored)));
    };
    const sortedTodos = useMemo(() => {
        return sortTodos(todos);
    }, [todos]);

    return (
        <List>
            <AnimatePresence>
                {sortedTodos.map(({ id, label, isDone }) => {
                    return (
                        <motion.div
                            key={id}
                            layout
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ListItem
                                key={id}
                                label={label}
                                isDone={isDone}
                                onItemDelete={removeTodo(id)}
                                onItemDoneToggle={toggleDoneTodo(id)}
                                onItemLabelEdit={editTodo(id)}
                            />
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </List>
    );
};
