import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import apolloMock from "../../testutils/generatedMocks";
import { Filter } from "../../generated/grapqhl";

import ResultsList, { TestResultsQuery } from "./TestResults";

const defaultMock = apolloMock(TestResultsQuery, { filter: Filter.Nonassigned },
    { 
        data: { 
            testResults: [
                { codigo: "1234567890", nombre: "Benito Antonio", apellidoPaterno: "Martinez", nivelEscrito: 4, meetLink: "meetlink1" },
                { codigo: "0987654321", nombre: "Alberto", apellidoPaterno: "Aguilera", nivelEscrito: 1, meetLink: "meetlink2" }
            ] 
        }
    }
);

const assignedMock = apolloMock(TestResultsQuery,{ filter: Filter.Assigned },
    {
        data: {
            testResults: [
                { codigo: "1234509876", nombre: "Pedro", apellidoPaterno: "Paramo", nivelEscrito: 3, nivelOral: 3, nivelFinal: 3, meetLink: "meetLink1" }
            ]             
        }
    });

export default {
    title: "Test Results List",
    component: ResultsList,
    parameters: {
        apolloClient: {
            mocks: [defaultMock,assignedMock]
        }
    }
} as ComponentMeta<typeof ResultsList>;

const Template: ComponentStory<typeof ResultsList> = (args) => (
    <ResultsList {...args} />
);

export const Normal = Template.bind({});