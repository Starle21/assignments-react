import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import React from "react";
import styled from "styled-components";

import { Checkbox } from "./Checkbox";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;

    &:hover > :last-child {
        visibility: visible;
    }
`;
const StyledActions = styled.div`
    visibility: hidden;
    display: flex;
    column-gap: 0.2rem;
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
        <StyledDiv>
            <Checkbox checked={isDone} onCheckedChange={onItemDoneToggle} />
            <Label>{label}</Label>
            <StyledActions>
                <button onClick={() => onItemLabelEdit(label)}>
                    <Pencil1Icon />
                </button>
                <button onClick={onItemDelete}>
                    <TrashIcon />
                </button>
            </StyledActions>
        </StyledDiv>
    );
};
