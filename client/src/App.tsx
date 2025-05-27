import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { useEffect, useMemo, useState } from "react";
import { ListItem } from "./components/ListItem";
import { Form } from "./components/form";
import { Todo } from "./types";
import { getTodos, postTodo } from "./api";

const countTodos = (items: Todo[]) => {
    const doneItems = items.filter((item) => item.isDone).length;
    const todoItems = items.length - doneItems;
    return { done: doneItems, todo: todoItems };
};

export const App = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [initialFormValue, setInitialFormValue] = useState("");

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

    const submitTodo = async (value: string) => {
        const todo = await postTodo(value);
        setTodos((previous) => [...previous, todo]);
    };

    const addTodo = (label: string) => {
        setInitialFormValue(label);
        toggleFormVisible();
    };

    const cancelTodo = () => {
        toggleFormVisible();
    };

    return (
        <ThemeProvider>
            <Container>
                <Layout>
                    <Header onItemAdd={addTodo}>To Do app</Header>
                    {isFormVisible && (
                        <Form initialValue={initialFormValue} onSubmit={submitTodo} onCancel={cancelTodo} />
                    )}
                    <List>
                        {todos.map(({ id, label, isDone }) => {
                            return (
                                <ListItem
                                    key={id}
                                    label={label}
                                    isDone={isDone}
                                    onItemDelete={() => {}}
                                    onItemDoneToggle={() => {}}
                                    onItemLabelEdit={() => {}}
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
