import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import HomePageMessage from "./HomePageMessage";

export default {
  title: "Dashboard/HomePageMessage",
  component: HomePageMessage,
  argTypes: { onSubmit: { action: "submitted" } },
} as ComponentMeta<typeof HomePageMessage>;

const Template: ComponentStory<typeof HomePageMessage> = (args) => (
  <HomePageMessage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  message: "Atencion!",
  active: false,
};
