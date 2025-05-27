import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { useEffect, useMemo, useState } from "react";
import { ListItem } from "./components/ListItem";

type Todo = {
    id: number;
    label: string;
    isDone: boolean;
    createdAt: number;
};

const countTodos = (items: Todo[]) => {
    const doneItems = items.filter((item) => item.isDone).length;
    const todoItems = items.length - doneItems;
    return { done: doneItems, todo: todoItems };
};

export const App = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const makeRequest = async () => {
            const request = await fetch("http://localhost:3000/items");
            const todos = (await request.json()) as Todo[];
            setTodos(todos);
        };
        makeRequest();
    }, []);

    const countedTodos = useMemo(() => {
        return countTodos(todos);
    }, [todos]);

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
                    {/* <Footer todoItems={countedTodos.todo} doneItems={countedTodos.done} /> */}
                    <Footer />
                </Layout>
            </Container>
        </ThemeProvider>
    );
};
