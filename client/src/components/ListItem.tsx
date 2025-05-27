import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import React from "react";
import styled from "styled-components";

import { Checkbox } from "./Checkbox";
import { Button } from "./Button";

const StyledTodo = styled.div`
    display: flex;
    align-items: center;
    height: 1.5rem;
    padding: 1rem 0.5rem;
    line-height: 3rem;
    border-radius: 0.5rem;

    background: linear-gradient(
        -45deg,
        ${(props) => props.theme.colors.blackA2},
        ${(props) => props.theme.colors.blackA2}
    );

    &:hover > :last-child {
        visibility: visible;
    }
`;
const StyledActions = styled.div`
    visibility: hidden;
    display: flex;
    column-gap: 0.2rem;
    margin-right: 0.5rem;
`;

const Label = styled.label`
    margin-left: 15px;
    flex-grow: 1;
`;

export type LiteeItemProp = {
    label: string;
    isDone: boolean;
    onItemLabelEdit: (label: string) => void;
    onItemDoneToggle: (isDone: boolean) => void;
    onItemDelete: () => void;
};

export const ListItem = (props: LiteeItemProp) => {
    const { label, isDone, onItemLabelEdit, onItemDoneToggle, onItemDelete } = props;

    return (
        <StyledTodo>
            <Checkbox checked={isDone} onCheckedChange={onItemDoneToggle} />
            <Label>{label}</Label>
            <StyledActions>
                <Button onClick={() => onItemLabelEdit(label)} variant="base">
                    <Pencil1Icon />
                </Button>
                <Button onClick={onItemDelete} variant="neutral">
                    <TrashIcon />
                </Button>
            </StyledActions>
        </StyledTodo>
    );
};
