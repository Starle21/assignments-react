import React, { PropsWithChildren } from "react";
import { olive, grass, blackA } from "@radix-ui/colors";
import { DefaultTheme, ThemeProvider as ThemeProviderStyled } from "styled-components";

import { GlobalStyle } from "../styles/GlobalStyle";

const theme: DefaultTheme = {
    colors: {
        ...olive,
        ...grass,
        ...blackA,
    },
};

export const ThemeProvider = (props: PropsWithChildren) => {
    const { children } = props;

    return (
        <ThemeProviderStyled theme={theme}>
            <GlobalStyle />
            {children}
        </ThemeProviderStyled>
    );
};
