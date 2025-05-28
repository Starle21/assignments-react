import { Layout } from "./components/Layout";
import { ThemeProvider } from "./styles/providers/ThemeProvider";
import { useEffect, useState } from "react";
import { Todo } from "./types";
import { getTodos } from "./api";
import { TodoHeading } from "./container-components/TodoHeading";
import { TodoList } from "./container-components/TodoList";
import { Container } from "./components/Container";
import { TodoStatistics } from "./container-components/TodoStatistics";

export type SubmitAction = () => (value: string) => void;

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
                    <TodoStatistics todos={todos} />
                </Layout>
            </Container>
        </ThemeProvider>
    );
};
