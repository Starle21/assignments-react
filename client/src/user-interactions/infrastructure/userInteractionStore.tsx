import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";
import { Nullable, FullTodo, TodoId, TodoLabel, TodoState, UserInteraction } from "../types";
import { deleteTodo, patchCompleteTodo, patchTodo, postTodo } from "../../api";
import { useTodosStoreRemover, useTodoStoreWriter } from "./todoStore";
import { createCheckedTodo, createLabelTodo, createNewRawTodo } from "../core";

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

    const saveTodo = useTodoStoreWriter();
    const deleteStoredTodo = useTodosStoreRemover();

    const uiState = useMemo(() => {
        return { isFormVisible, initialFormValue, actionToSubmit };
    }, [isFormVisible, initialFormValue, actionToSubmit]);

    const userInteractionApi: UserInteraction = useMemo(() => {
        const toggleFormVisible = () => {
            setIsFormVisible((previous) => !previous);
        };

        const addTodo = (oldLabel: string) => {
            // const saveTodo = useTodoStoreWriter();
            setInitialFormValue(oldLabel);
            setActionToSubmit(() => async (newLabel: TodoLabel) => {
                try {
                    const newTodo = createNewRawTodo(newLabel); //CORE
                    const todo = (await postTodo(newTodo)) as FullTodo; //CORE
                    saveTodo(todo); //CORE
                } catch (e: any) {
                    console.error(e.name || "Unknown Error");
                }
                toggleFormVisible();
            });
            toggleFormVisible();
        };

        const editTodo = (id: TodoId) => (oldLabel: TodoLabel) => {
            // const saveTodo = useTodoStoreWriter();
            setInitialFormValue(oldLabel);
            setActionToSubmit(() => async (newLabel: TodoLabel) => {
                try {
                    const updatedTodo = createLabelTodo(id, newLabel); //CORE
                    const savedTodo = (await patchTodo(updatedTodo)) as FullTodo; //CORE
                    saveTodo(savedTodo); //CORE
                } catch (e: any) {
                    console.error(e.name || "Unknown Error");
                }
                toggleFormVisible();
            });
            toggleFormVisible();
        };

        const toggleCheckTodo = (id: TodoId) => async (isDone: TodoState) => {
            // const saveTodo = useTodoStoreWriter();
            const checkedTodo = createCheckedTodo(id, isDone); //CORE
            try {
                const savedTodo = isDone //CORE
                    ? ((await patchCompleteTodo(id)) as FullTodo)
                    : ((await patchTodo(checkedTodo)) as FullTodo);
                saveTodo(savedTodo); //CORE
            } catch (e: any) {
                console.error(e.name || "Unknown Error");
            }
        };

        const removeTodo = (id: TodoId) => async () => {
            // const deleteStoredTodo = useTodosStoreRemover();
            try {
                await deleteTodo(id); //CORE
                deleteStoredTodo(id); //CORE
            } catch (e: any) {
                console.error(e.name || "Unknown Error");
            }
        };

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
