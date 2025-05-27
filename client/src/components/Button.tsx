import { css, styled } from "styled-components";

type ButtonPropsVariant = "base" | "neutral" | "circular";

type ButtonProps = {
    variant: ButtonPropsVariant;
    label?: string;
} & React.ComponentProps<"button">;

type StyledButtonProps = {
    $variant: ButtonPropsVariant;
};

export const Button = (props: ButtonProps) => {
    const { children, variant, label, ...rest } = props;

    return (
        <StyledButton $variant={variant} data-label={label} {...rest}>
            {children}
        </StyledButton>
    );
};

const StyledButton = styled.button<StyledButtonProps>`
    all: unset;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 25px;
    height: 25px;

    border: 1px solid;
    border-color: ${(props) => props.theme.colors.olive9};

    color: #fff;

    ${({ $variant }) =>
        $variant === "base" &&
        css`
            background-color: ${(props) => props.theme.colors.grass9};
        `};

    ${({ $variant }) =>
        $variant === "neutral" &&
        css`
            background-color: ${(props) => props.theme.colors.blackA9};
        `};

    ${({ $variant }) =>
        $variant === "circular" &&
        css`
            background-color: ${(props) => props.theme.colors.grass9};
            border-radius: 50%;
        `};
`;
