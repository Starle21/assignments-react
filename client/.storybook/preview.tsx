import type { Parameters, Preview, Decorator } from "@storybook/react";
import { ThemeProvider } from "../src/components/providers/ThemeProvider";
import React from "react";

export const decorators: Decorator[] = [
    (Story) => (
        <ThemeProvider>
            <Story />
        </ThemeProvider>
    ),
];

export const parameters: Parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
