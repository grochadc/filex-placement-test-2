import React from "react";
import Header from "./Header";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Components/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  title: "RESULTADOS",
};
