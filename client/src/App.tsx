import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { useEffect, useState } from "react";
import { ListItem } from "./components/ListItem";

type Todo = {
    id: number;
    label: string;
    isDone: boolean;
    createdAt: number;
};

export const App = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const makeRequest = async () => {
            const request = await fetch("http://localhost:3000/items");
            const todos = await request.json();
            setTodos(todos);
        };
        makeRequest();
    }, []);

    return (
        <ThemeProvider>
            <Container>
                <Layout>
                    <Header onItemAdd={() => console.warn("unimplemented")}>To Do app</Header>
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
                    <Footer />
                </Layout>
            </Container>
        </ThemeProvider>
    );
};
