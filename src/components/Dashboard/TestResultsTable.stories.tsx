import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import apolloMock from "../../testutils/generatedMocks";
import { Filter, TestResults } from "../../generated/grapqhl";

import ResultsTable from "./TestResultsTable";

const results: TestResults[] = [
  {
    id: "1",
    codigo: "1234567890",
    nombre: "Benito Antonio",
    apellidoPaterno: "Martinez",
    apellidoMaterno: "Ocasio",
    genero: "M",
    ciclo: "2022B",
    carrera: "Abogado",
    telefono: "312123456",
    email: "bad@bunny.pr",
    institutionalEmail: null,
    nivelEscrito: 4,
    curso: "en",
    externo: false,
    reubicacion: false,
    generated_id: "ov0t8k",
    meetLink: "https://meet.google.com/moh-ngxa-fqh",
  },
  {
    id: "2",
    codigo: "0987654321",
    nombre: "Alberto",
    apellidoPaterno: "Aguilera",
    apellidoMaterno: "Valadez",
    genero: "M",
    ciclo: "2022B",
    carrera: "Abogado",
    telefono: "312123456",
    email: "juanga@elnoanoa.mx",
    institutionalEmail: null,
    nivelEscrito: 2,
    curso: "en",
    externo: false,
    reubicacion: false,
    generated_id: "ov0t8k",
    meetLink: "https://meet.google.com/moh-ngxa-fqh",
  },
];


const emptyObjGenerator = (num: number) => {
  const arr = new Array(num);
  return arr.fill({});
};

const emptyObjects = emptyObjGenerator(10).map((el) => ({
  ...el,
  nivelOral: 3,
  nivelFinal: 3,
}));

export default {
  title: "Dashboard/ResultsTable",
  component: ResultsTable,
  argTypes: {
    reloadPage: { action: "page reload" },
    submitEntry: { action: "submitted entry" },
    fetchDataToAppend: { action: "asked for more data" },
  },
} as ComponentMeta<typeof ResultsTable>;

const Template: ComponentStory<typeof ResultsTable> = (args) => (
  <ResultsTable {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  initialData: results
};
