import { Footer } from "../../components/Footer";
import { useCountsStore } from "../infrastructure/store/todoStore";

export const TodoStatistics = () => {
    const { done, todo } = useCountsStore();

    return <Footer todoItems={todo} doneItems={done} />;
};
