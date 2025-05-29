import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";
import { TodoId, TodoLabel, TodoState } from "../../core/types";
import { useCreateTodo } from "../../core/use-cases/createTodo";
import { useUpdateTodo } from "../../core/use-cases/updateTodo";
import { useDeleteTodo } from "../../core/use-cases/deleteTodo";
import { useToggleDoneTodo } from "../../core/use-cases/toggleDoneTodo";
import { UserInteraction } from "./types";
import { Nullable } from "../../../shared/types";

// ===
type UIState = {
    isFormVisible: boolean;
    initialFormValue: string;
    actionToSubmit: SubmitAction;
};

type SubmitAction = () => (value: string) => void;
// ===

const UIStateContext = createContext<Nullable<UIState>>(null);
const UserInteractionContext = createContext<Nullable<UserInteraction>>(null);

export const useUIState = () => useContext(UIStateContext)!;
export const useUserInteractionApi = () => useContext(UserInteractionContext)!;

export const UserInteractionStore = ({ children }: PropsWithChildren) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [initialFormValue, setInitialFormValue] = useState("");
    const [actionToSubmit, setActionToSubmit] = useState<SubmitAction>(() => () => {
        console.warn("no action to do");
    });

    // implicit injection, better to "bake" dependencies with partial application to make them more explicit
    const createTodo = useCreateTodo();
    const updateTodo = useUpdateTodo();
    const deleteTodo = useDeleteTodo();
    const toggleDone = useToggleDoneTodo();

    const uiState = useMemo(() => {
        return { isFormVisible, initialFormValue, actionToSubmit };
    }, [isFormVisible, initialFormValue, actionToSubmit]);

    const userInteractionApi: UserInteraction = useMemo(() => {
        const toggleFormVisible = () => {
            setIsFormVisible((previous) => !previous);
        };

        const addTodo = (oldLabel: string) => {
            setInitialFormValue(oldLabel);
            setActionToSubmit(() => async (newLabel: TodoLabel) => {
                createTodo(newLabel);
                toggleFormVisible();
            });
            toggleFormVisible();
        };

        const editTodo = (id: TodoId) => (oldLabel: TodoLabel) => {
            setInitialFormValue(oldLabel);
            setActionToSubmit(() => (newLabel: TodoLabel) => {
                updateTodo(id, newLabel);
                toggleFormVisible();
            });
            toggleFormVisible();
        };

        const toggleCheckTodo = (id: TodoId) => (isDone: TodoState) => {
            toggleDone(id, isDone);
        };

        const removeTodo = (id: TodoId) => () => deleteTodo(id);

        const cancelTodo = () => {
            toggleFormVisible();
        };

        return {
            addTodo,
            cancelTodo,
            editTodo,
            removeTodo,
            toggleCheckTodo,
        };
    }, []);

    return (
        <UIStateContext.Provider value={uiState}>
            <UserInteractionContext.Provider value={userInteractionApi}>{children}</UserInteractionContext.Provider>
        </UIStateContext.Provider>
    );
};
