import { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Cross1Icon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";

const meta = {
    title: "Button",
    component: Button,
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Base: Story = {
    args: {
        children: <Pencil1Icon />,
        variant: "base",
    },
};
export const Neutral: Story = {
    args: {
        children: <Cross1Icon />,
        variant: "neutral",
    },
};
export const Circular: Story = {
    args: {
        children: <PlusIcon />,
        variant: "circular",
    },
};

export default meta;
