import { Layout } from "./components/Layout";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/styles/providers/ThemeProvider";
import { useEffect, useMemo, useState } from "react";
import { Todo } from "./types";
import { getTodos } from "./api";
import { TodoHeading } from "./container-components/TodoHeading";
import { TodoList } from "./container-components/TodoList";
import { Container } from "./components/Container";

export type SubmitAction = () => (value: string) => void;

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

    const todoListProps = { setTodos, todos, toggleFormVisible, setInitialFormValue, setActionToSubmit };
    const todoHeadingProps = {
        setInitialFormValue,
        setActionToSubmit,
        actionToSubmit,
        initialFormValue,
        isFormVisible,
        toggleFormVisible,
        setTodos,
    };

    return (
        <ThemeProvider>
            <Container>
                <Layout>
                    <TodoHeading {...todoHeadingProps} />
                    <TodoList {...todoListProps} />
                    <Footer todoItems={countedTodos.todo} doneItems={countedTodos.done} />
                </Layout>
            </Container>
        </ThemeProvider>
    );
};
