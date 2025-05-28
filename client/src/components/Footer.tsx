import React from "react";
import styled from "styled-components";

type FooterProps = {
    todoItems?: number;
    doneItems?: number;
};

export const Footer = (props: FooterProps) => {
    const { todoItems, doneItems } = props;

    return (
        <FooterStyled>
            <HiglightTodo>Todo: {todoItems ?? 0}</HiglightTodo>
            <p>Done: {doneItems ?? 0}</p>
        </FooterStyled>
    );
};

const FooterStyled = styled.footer`
    display: flex;
    column-gap: 1.5rem;
    align-items: center;

    height: 0.5rem;
    padding: 1rem 0.5rem 1rem 1rem;
    line-height: 1rem;
    border-radius: 0.5rem;
    margin: 0.6rem 0.5rem;
    text-transform: uppercase;
    font-weight: 800;

    background: linear-gradient(
        -45deg,
        ${(props) => props.theme.colors.beige100},
        ${(props) => props.theme.colors.beige300}
    );
`;

const HiglightTodo = styled.p`
    color: ${(props) => props.theme.colors.primary100};
`;
