import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import styled from "styled-components";

import { Input } from "./Input";
import { Button } from "../Button";

type FormProps = {
    initialValue: string;
    onSubmit: (value: string) => void;
    onCancel: () => void;
};

const FormStyled = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.5rem;
    padding: 1rem 0.5rem;
    line-height: 3rem;
    border-radius: 0.5rem;

    background: linear-gradient(
        -45deg,
        ${(props) => props.theme.colors.blackA2},
        ${(props) => props.theme.colors.blackA2}
    );
`;

const ActionsStyled = styled.div`
    display: flex;
    column-gap: 0.2rem;
    margin-right: 0.5rem;
`;

export const Form = (props: FormProps) => {
    const { initialValue, onSubmit, onCancel } = props;

    const [inputValue, setInputValue] = useState(initialValue);

    return (
        <FormStyled
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(inputValue);
            }}
            onReset={() => {
                onCancel();
            }}
        >
            <Input value={inputValue} onValueChange={(value) => setInputValue(value)} />
            <ActionsStyled>
                <Button type={"submit"} variant="base">
                    <CheckIcon />
                </Button>
                <Button type={"reset"} variant="neutral">
                    <Cross1Icon />
                </Button>
            </ActionsStyled>
        </FormStyled>
    );
};
