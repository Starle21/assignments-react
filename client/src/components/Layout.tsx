import styled from "styled-components";

export const Layout = styled.main`
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 700px;
    min-height: 65vh;
    margin: 0 30px;
    padding: 20px;

    background-color: rgb(255, 255, 255);
    border: 1px solid;
    border-color: ${(props) => props.theme.colors.olive6};
    border-radius: 5px;

    overflow: hidden;
    max-height: 50vh;
`;
