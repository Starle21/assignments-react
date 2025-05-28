import { DefaultThemes } from "styled-components";
import { olive, grass, blackA } from "@radix-ui/colors";

const palette = {
    ...olive,
    ...grass,
    ...blackA,
};
export const themes: DefaultThemes = {
    branded: {
        colors: {
            primary100: "rgba(27, 137, 45)",
            primary200: "rgba(27, 137, 45, 0.7)",
            primary300: "rgba(143, 180, 149, 0.27)",
            neutral100: "rgb(22,29,26)",
            neutral200: "rgba(22, 29, 26, 0.73)",
            neutral300: "rgba(62, 68, 65, 0.15)",
            neutral400: "rgba(62, 68, 65, 0.35)",
            beige100: "rgba(224, 222, 218, 0.45)",
            beige200: "rgba(243, 240, 236, 0.47)",
            beige300: "rgba(255, 252, 248, 0.75)",
            beige400: "rgba(255, 252, 248, 0.47)",
            beige500: "rgba(255, 252, 248, 0.75)",
            white100: "rgba(238, 238, 238, 0.89)",
            white200: "rgb(255, 255, 255, 0.6)",
        },
        palette,
    },
}