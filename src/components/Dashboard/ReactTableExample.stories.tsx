import React from "react";
import TableView from "./ReactTableExample";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    titlte: "ReactTable Example",
    componet: TableView
} as ComponentMeta<typeof TableView>;

const Template: ComponentStory<typeof TableView> = (args) => (
    <TableView />
);

export const Normal = Template.bind({});