import styled from "styled-components";

const InputStyled = styled.input`
    all: unset;
    flex-grow: 1;
    margin-left: 3.2rem;
    font-weight: 600;
    border-bottom: 2px solid transparent;

    &:focus {
        border-bottom: 2px solid ${(props) => props.theme.colors.primary100};
    }
`;

type InputProps = {
    value: string;
    onValueChange: (value: string) => void;
};

export const Input = (props: InputProps) => {
    const { value, onValueChange } = props;

    return (
        <InputStyled
            value={value}
            onChange={(e) => {
                const value = e.currentTarget.value;
                onValueChange(value);
            }}
        />
    );
};
