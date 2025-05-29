import { Layout } from "./components/Layout";
import { ThemeProvider } from "./styles/providers/ThemeProvider";
import { useEffect, useState } from "react";
import { FullTodo } from "./user-interactions/types";
import { getTodos } from "./api";
import { TodoHeading } from "./container-components/TodoHeading";
import { TodoList } from "./container-components/TodoList";
import { Container } from "./components/Container";
import { TodoStatistics } from "./container-components/TodoStatistics";
import { Logo } from "./components/Logo";
import { TodoStore } from "./user-interactions/infrastructure/todoStore";
import { UserInteractionStore } from "./user-interactions/infrastructure/userInteractionStore";
import { TodosFeature } from "./container-components/TodosFeature";

export const App = () => {
    return (
        <ThemeProvider>
            <Container>
                <Layout>
                    <TodoStore>
                        <UserInteractionStore>
                            <TodosFeature>
                                <TodoHeading />
                                <TodoList />
                                <TodoStatistics />
                            </TodosFeature>
                        </UserInteractionStore>
                    </TodoStore>
                </Layout>
                <Logo />
            </Container>
        </ThemeProvider>
    );
};
