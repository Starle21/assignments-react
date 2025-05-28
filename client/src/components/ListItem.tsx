import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import React, { PropsWithChildren } from "react";
import styled, { useTheme } from "styled-components";

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
        ${(props) => props.theme.colors.beige100},
        ${(props) => props.theme.colors.beige300}
    );

    &:hover {
        outline: 2px solid ${(props) => props.theme.colors.primary100};
        background: linear-gradient(
            -45deg,
            ${(props) => props.theme.colors.beige400},
            ${(props) => props.theme.colors.beige500}
        );
    }

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

const StyledLabel = styled.label`
    margin-left: 15px;
    flex-grow: 1;
`;

export const ThickEditIcon = styled(Pencil1Icon)`
    path {
        stroke-width: 1;
        stroke: ${(props) => props.theme.colors.white100};
    }
`;
export const ThickTrashIcon = styled(TrashIcon)`
    path {
        stroke-width: 1;
        stroke: ${(props) => props.theme.colors.white100};
    }
`;

export type ListItemProp = {
    label: string;
    isDone: boolean;
    onItemLabelEdit: (label: string) => void;
    onItemDoneToggle: (isDone: boolean) => void;
    onItemDelete: () => void;
} & PropsWithChildren;

export const ListItem = (props: ListItemProp) => {
    const { label, isDone, onItemLabelEdit, onItemDoneToggle, onItemDelete } = props;

    const theme = useTheme();

    return (
        <StyledTodo>
            <Checkbox checked={isDone} onCheckedChange={onItemDoneToggle} />
            <StyledLabel>{label}</StyledLabel>
            <StyledActions>
                <Button onClick={() => onItemLabelEdit(label)} variant="base">
                    <ThickEditIcon width={20} height={20} color={theme.colors.white100} />
                </Button>
                <Button onClick={onItemDelete} variant="neutral">
                    <ThickTrashIcon width={30} height={22} color={theme.colors.white100} />
                </Button>
            </StyledActions>
        </StyledTodo>
    );
};
