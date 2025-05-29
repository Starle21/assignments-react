import { PropsWithChildren } from "react";
import { useInitializeTodos } from "../core/use-cases/initializeTodos";

const TodosFeature = ({ children }: PropsWithChildren) => {
    useInitializeTodos();

    return <>{children}</>;
};

export { TodosFeature };
