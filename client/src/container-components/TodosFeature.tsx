import { PropsWithChildren } from "react";
import { useInitializeTodos } from "../user-interactions/initializeTodos";

const TodosFeature = ({ children }: PropsWithChildren) => {
    useInitializeTodos();

    return <>{children}</>;
};

export { TodosFeature };
