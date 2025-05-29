import { styled } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useUIState, useUserInteractionApi } from "../infrastructure/store/userInteractionStore";
import { Header } from "../../components/Header";
import { Form } from "../../components/form";

export const TodoHeading = () => {
    const { addTodo, cancelTodo } = useUserInteractionApi();
    const { actionToSubmit, isFormVisible, initialFormValue } = useUIState();

    return (
        <HeadingStyled>
            <Header onItemAdd={addTodo}>
                YOU need a <HiglightStyled>TODO:</HiglightStyled>
            </Header>
            <WrapperStyled>
                <AnimatePresence>
                    {isFormVisible && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Form initialValue={initialFormValue} onSubmit={actionToSubmit} onCancel={cancelTodo} />
                        </motion.div>
                    )}
                </AnimatePresence>
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
