import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import styled, { useTheme } from "styled-components";
import { Button } from "./Button";

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
    padding: 0.5rem 1rem;
    padding-right: 1.7rem;
`;

const StyledTitle = styled.h1`
    font-weight: 900;
    font-size: 3rem;
    letter-spacing: 0.1em;
`;

export const ThickAddIcon = styled(PlusIcon)`
    path {
        stroke-width: 2;
        stroke: ${(props) => props.theme.colors.white100};
    }
`;

type HeaderProps = {
    children: React.ReactNode;
    onItemAdd: (label: string) => void;
};

export const Header = (props: HeaderProps) => {
    const { children, onItemAdd } = props;
    const theme = useTheme();

    return (
        <StyledHeader>
            <StyledTitle>{children}</StyledTitle>
            <Button
                onClick={(e) => {
                    const label = e.currentTarget.dataset.label ?? "";
                    onItemAdd(label);
                }}
                data-label="to not forget to buy your spaceship!"
                variant="circular"
            >
                <ThickAddIcon width={30} height={30} color={theme.colors.white100} />
            </Button>
        </StyledHeader>
    );
};
