import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import styled from "styled-components";
import { Button } from "./Button";

const StyledDiv = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
    padding: 0.5rem 1rem;
    padding-right: 1.7rem;
`;

type HeaderProps = {
    children: React.ReactNode;
    onItemAdd: (label: string) => void;
};

export const Header = (props: HeaderProps) => {
    const { children, onItemAdd } = props;

    return (
        <StyledDiv>
            <h1>{children}</h1>
            <Button
                onClick={(e) => {
                    const label = e.currentTarget.dataset.label ?? "";
                    onItemAdd(label);
                }}
                data-label="to not forget to buy your spaceship!"
                variant="circular"
            >
                <PlusIcon />
            </Button>
        </StyledDiv>
    );
};
