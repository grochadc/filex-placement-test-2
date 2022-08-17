import React from "react";
import { StyledButton } from "./styled";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  component: StyledButton,
  title: "Utils/StyledButton",
} as ComponentMeta<typeof StyledButton>;

const Template: ComponentStory<typeof StyledButton> = (args) => (
  <StyledButton {...args}>Button</StyledButton>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};


export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true
}