import React from "react";
import styled from "styled-components";

const FooterStyled = styled.footer`
    display: flex;
    column-gap: 1.5rem;

    margin-top: 15px;
    padding-top: 15px;

    border-top: 1px solid;
    border-color: ${(props) => props.theme.colors.olive6};
`;

type FooterProps = {
    todoItems?: number;
    doneItems?: number;
};

export const Footer = (props: FooterProps) => {
    const { todoItems, doneItems } = props;

    return (
        <FooterStyled>
            <p>Todo: {todoItems ?? 0}</p>
            <p>Done: {doneItems ?? 0}</p>
        </FooterStyled>
    );
};
