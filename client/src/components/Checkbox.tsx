import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import styled from "styled-components";

const CheckboxStyled = styled(CheckboxPrimitive.Root)`
    all: unset;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 2.4rem;
    height: 2.2rem;

    background-color: ${(props) => props.theme.colors.white100};
    border: 1pt solid ${(props) => props.theme.colors.primary300};
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.palette.grass5};
    }

    &:focus {
        box-shadow: 0 2px 10px black;
    }
`;

export const ThickDoneIcon = styled(CheckIcon)`
    transform: translateY(6px);

    path {
        stroke-width: 1;
        stroke: ${(props) => props.theme.colors.primary100};
    }
`;

const CheckboxIndicator = styled(CheckboxPrimitive.Indicator)`
    color: ${(props) => props.theme.palette.grass11};
`;

export const Checkbox = (props: CheckboxProps) => (
    <CheckboxStyled {...props}>
        <CheckboxIndicator>
            <ThickDoneIcon width={25} height={25} />
        </CheckboxIndicator>
    </CheckboxStyled>
);
