import React, { PropsWithChildren, useState } from "react";
import { ThemeProvider as ThemeProviderStyled } from "styled-components";

import { GlobalStyle } from "../GlobalStyle";
import type { ThemeTokens } from "../styles";
import { themes } from "../themes";

export const ThemeProvider = (props: PropsWithChildren) => {
    const { children } = props;
    const [theme] = useState<ThemeTokens>("branded");

    return (
        <ThemeProviderStyled theme={themes[theme]}>
            <GlobalStyle />
            {children}
        </ThemeProviderStyled>
    );
};
