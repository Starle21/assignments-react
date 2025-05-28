import { styled } from "styled-components";
import { SubmitAction } from "../App";
import { FC } from "react";
import { Todo, TodoLabel } from "../types";
import { postTodo } from "../api";
import { Header } from "../components/Header";
import { Form } from "../components/form";

type TodoHeadingProp = {
    setInitialFormValue: React.Dispatch<React.SetStateAction<string>>;
    setActionToSubmit: React.Dispatch<React.SetStateAction<SubmitAction>>;
    actionToSubmit: SubmitAction;
    initialFormValue: string;
    isFormVisible: boolean;
    toggleFormVisible: () => void;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoHeading: FC<TodoHeadingProp> = ({
    setInitialFormValue,
    setActionToSubmit,
    actionToSubmit,
    toggleFormVisible,
    setTodos,
    isFormVisible,
    initialFormValue,
}) => {
    const cancelTodo = () => {
        toggleFormVisible();
    };
    const addTodo = (label: TodoLabel) => {
        setInitialFormValue(label);
        setActionToSubmit(() => submitPostTodo);
        toggleFormVisible();
    };
    const submitPostTodo = async (value: TodoLabel) => {
        const todo = await postTodo(value);
        setTodos((previous) => [...previous, todo]);
        toggleFormVisible();
    };
    return (
        <HeadingStyled>
            <Header onItemAdd={addTodo}>
                YOU need a <HiglightStyled>TODO:</HiglightStyled>
            </Header>
            <WrapperStyled>
                {isFormVisible && (
                    <Form initialValue={initialFormValue} onSubmit={actionToSubmit} onCancel={cancelTodo} />
                )}
            </WrapperStyled>
        </HeadingStyled>
    );
};

const HeadingStyled = styled.div`
    height: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 0.5rem 0.5rem 0.5rem;
    margin-top: 1rem;
`;

const HiglightStyled = styled.span`
    color: ${(props) => props.theme.colors.primary100};
`;

const WrapperStyled = styled.div`
    height: 3.7rem;
`;
