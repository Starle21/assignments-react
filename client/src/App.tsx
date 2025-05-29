import { Layout } from "./components/Layout";
import { ThemeProvider } from "./styles/providers/ThemeProvider";
import { Container } from "./components/Container";
import { Logo } from "./components/Logo";
import { TodoStore } from "./feature-todos/infrastructure/store/todoStore";
import { UserInteractionStore } from "./feature-todos/infrastructure/store/userInteractionStore";
import { TodosFeature } from "./feature-todos/ui/TodosFeature";
import { TodoHeading } from "./feature-todos/ui/TodoHeading";
import { TodoList } from "./feature-todos/ui/TodoList";
import { TodoStatistics } from "./feature-todos/ui/TodoStatistics";

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
