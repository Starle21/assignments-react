import { TodoId } from "../../core/types";

// User Interactions
export type CancelTodo = () => void;
export type AddTodo = (label: string) => void;
export type EditTodo = (id: TodoId) => (label: string) => void;
export type RemoveTodo = (id: TodoId) => () => void;
export type ToggleCheckTodo = (id: TodoId) => (isDone: boolean) => void;

export type UserInteraction = {
    addTodo: AddTodo;
    cancelTodo: CancelTodo;
    editTodo: EditTodo;
    removeTodo: RemoveTodo;
    toggleCheckTodo: ToggleCheckTodo;
};
