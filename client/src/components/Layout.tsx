import styled from "styled-components";

export const Layout = styled.main`
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 700px;
    min-height: 65vh;
    margin: 0 30px;
    padding: 20px;

    background-color: ${(props) => props.theme.colors.beige200};
    outline: 1px solid ${(props) => props.theme.colors.white200};
    outline-offset: 2pt;
    border-radius: 4px;

    overflow: hidden;
    max-height: 50vh;
    min-width: 300px;
`;
