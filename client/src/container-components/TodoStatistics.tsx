import { Footer } from "../components/Footer";
import { useCountsStore } from "../user-interactions/infrastructure/todoStore";

export const TodoStatistics = () => {
    const { done, todo } = useCountsStore();

    return <Footer todoItems={todo} doneItems={done} />;
};
