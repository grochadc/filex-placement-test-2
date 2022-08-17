import React from 'react';
import { Error } from "./components";
import { ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    component: Error,
    title: "Utils/Error"
} as ComponentMeta<typeof Error>;

const Template: ComponentStory<typeof Error> = (args) => <Error {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    e: {
        some: "javascript",
        object: "to render",
        with: {
            deep: "props"
        }
    }
}


