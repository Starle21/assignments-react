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

    width: 2.7rem;
    height: 2.5rem;

    border-radius: 0.5rem;
    transition: transform 0.3s ease;

    background-color: ${(props) => props.theme.palette.olive1};

    &:focus {
        box-shadow: 0 2px 10px black;
    }
    &:hover {
        box-shadow: 0 2px 10px ${(props) => props.theme.colors.neutral200};
    }
    &:active {
        transform: translateY(5px);
    }

    ${({ $variant }) =>
        $variant === "base" &&
        css`
            background: linear-gradient(
                120deg,
                ${(props) => props.theme.colors.primary100},
                ${(props) => props.theme.colors.primary200}
            );
        `};

    ${({ $variant }) =>
        $variant === "neutral" &&
        css`
            background: linear-gradient(
                170deg,
                ${(props) => props.theme.colors.neutral400},
                ${(props) => props.theme.colors.neutral200}
            );
        `};

    ${({ $variant }) =>
        $variant === "circular" &&
        css`
            width: 4rem;
            height: 4rem;
            background: linear-gradient(
                120deg,
                ${(props) => props.theme.colors.primary100},
                ${(props) => props.theme.colors.primary200}
            );
            border-radius: 50%;
            color: ${(props) => props.theme.colors.white100};
        `};
`;
