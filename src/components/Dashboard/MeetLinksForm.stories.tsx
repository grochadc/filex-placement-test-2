import React from "react";
import MeetLinksForm from "./MeetLinksForm";
import { ComponentMeta, ComponentStory } from "@storybook/react";
export default {
    title: 'Dashboard/MeetLinksForm',
    component: MeetLinksForm
} as ComponentMeta<typeof MeetLinksForm>;

const Template: ComponentStory<typeof MeetLinksForm> = (args) => <MeetLinksForm  {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    links: [
        {id: "abc", teacher: "gonzo", active: true, link: "meetlink"}
    ],
    course: "en",
}