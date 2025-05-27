import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { useEffect, useMemo, useState } from "react";
import { ListItem } from "./components/ListItem";
import { Form } from "./components/form";
import { Todo, TodoId, TodoLabel, TodoState } from "./types";
import { deleteTodo, getTodos, patchTodo, postTodo } from "./api";

type SubmitAction = () => (value: string) => void;

const countTodos = (items: Todo[]) => {
    const doneItems = items.filter((item) => item.isDone).length;
    const todoItems = items.length - doneItems;
    return { done: doneItems, todo: todoItems };
};

export const App = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [initialFormValue, setInitialFormValue] = useState("");
    const [actionToSubmit, setActionToSubmit] = useState<SubmitAction>(() => () => {});

    useEffect(() => {
        const makeRequest = async () => {
            const todos = await getTodos();
            setTodos(todos);
        };
        makeRequest();
    }, []);

    const countedTodos = useMemo(() => {
        return countTodos(todos);
    }, [todos]);

    const toggleFormVisible = () => {
        setIsFormVisible((previous) => !previous);
    };

    const submitPostTodo = async (value: TodoLabel) => {
        const todo = await postTodo(value);
        setTodos((previous) => [...previous, todo]);
        toggleFormVisible();
    };

    const submitPatchTodo = async (id: TodoId, label: TodoLabel) => {
        const savedTodo = await patchTodo(id, { label });
        setTodos((previous) => previous.map((stored) => (stored.id === savedTodo.id ? savedTodo : stored)));
        toggleFormVisible();
    };

    const addTodo = (label: TodoLabel) => {
        setInitialFormValue(label);
        setActionToSubmit(() => submitPostTodo);
        toggleFormVisible();
    };

    const cancelTodo = () => {
        toggleFormVisible();
    };

    const toggleDoneTodo = (id: TodoId) => async (isDone: TodoState) => {
        const savedTodo = await patchTodo(id, { isDone });
        setTodos((previous) => previous.map((stored) => (stored.id === savedTodo.id ? savedTodo : stored)));
    };

    const editTodo = (id: TodoId) => (label: TodoLabel) => {
        setInitialFormValue(label);
        setActionToSubmit(() => (newLabel: TodoLabel) => submitPatchTodo(id, newLabel));
        toggleFormVisible();
    };

    const removeTodo = (id: TodoId) => async () => {
        await deleteTodo(id);
        setTodos((previous) => previous.filter((todo) => todo.id !== id));
    };

    return (
        <ThemeProvider>
            <Container>
                <Layout>
                    <Header onItemAdd={addTodo}>To Do app</Header>
                    {isFormVisible && (
                        <Form initialValue={initialFormValue} onSubmit={actionToSubmit} onCancel={cancelTodo} />
                    )}
                    <List>
                        {todos.map(({ id, label, isDone }) => {
                            return (
                                <ListItem
                                    key={id}
                                    label={label}
                                    isDone={isDone}
                                    onItemDelete={removeTodo(id)}
                                    onItemDoneToggle={toggleDoneTodo(id)}
                                    onItemLabelEdit={editTodo(id)}
                                />
                            );
                        })}
                    </List>
                    <Footer todoItems={countedTodos.todo} doneItems={countedTodos.done} />
                </Layout>
            </Container>
        </ThemeProvider>
    );
};
