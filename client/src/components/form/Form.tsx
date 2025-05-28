import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import styled, { useTheme } from "styled-components";

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
    outline: 2px solid ${(props) => props.theme.colors.primary100};

    &:hover,
    &:focus-within {
        background: linear-gradient(
            -45deg,
            ${(props) => props.theme.colors.beige400},
            ${(props) => props.theme.colors.beige500}
        );
    }
`;

export const ThickSubmitIcon = styled(CheckIcon)`
    path {
        stroke-width: 1;
        stroke: ${(props) => props.theme.colors.white100};
    }
`;

export const ThickCancelIcon = styled(Cross1Icon)`
    path {
        stroke-width: 3;
        stroke: ${(props) => props.theme.colors.white100};
    }
`;

const ActionsStyled = styled.div`
    display: flex;
    column-gap: 0.2rem;
    margin-right: 0.5rem;
`;

export const Form = (props: FormProps) => {
    const { initialValue, onSubmit, onCancel } = props;

    const [inputValue, setInputValue] = useState(initialValue);
    const theme = useTheme();

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
                    <ThickSubmitIcon width={25} height={25} color={theme.colors.white100} />
                </Button>
                <Button type={"reset"} variant="neutral">
                    <ThickCancelIcon width={17} height={17} color={theme.colors.white100} />
                </Button>
            </ActionsStyled>
        </FormStyled>
    );
};
