import "styled-components";

declare module "styled-components" {
    export interface DefaultThemes extends Themes {}
    export interface DefaultTheme extends Theme {}
}

type Themes = Record<ThemeTokens, Theme>;
type ThemeTokens = "branded";
type Theme = {
    colors: Colors;
    palette: Record<string, string>;
};
export interface Colors {
    primary100: string;
    primary200: string;
    primary300: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
    beige100: string;
    beige200: string;
    beige300: string;
    beige400: string;
    beige500: string;
    white100: string;
    white200: string;
}
