import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import apolloMock from "../../testutils/generatedMocks";
import { Filter, TestResults } from "../../generated/grapqhl";

import ResultsList, {
  TestResultsQuery,
  SaveFinalLevelsMutation,
} from "./TestResults";

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

const defaultMock = apolloMock(
  TestResultsQuery,
  { filter: Filter.Nonassigned },
  {
    data: {
      testResults: [...results],
    },
  }
);

const emptyObjects = emptyObjGenerator(10).map((el) => ({...el, nivelOral: 3, nivelFinal: 3}));

const assignedMock = apolloMock(
  TestResultsQuery,
  { filter: Filter.Assigned },
  {
    data: {
      testResults: [
        {
          id: "3",
          codigo: "1234509876",
          nombre: "Pedro",
          apellidoPaterno: "Paramo",
          apellidoMaterno: "Paramo",
          genero: "M",
          ciclo: "2022B",
          carrera: "Abogado",
          telefono: "312123456",
          email: "pedrop@lamedialuna.com",
          institutionalEmail: null,
          nivelEscrito: 2,
          curso: "en",
          externo: false,
          reubicacion: false,
          generated_id: "ov0t8k",
          meetLink: "https://meet.google.com/moh-ngxa-fqh",
          nivelOral: 3,
          nivelFinal: 3,
        },
        ...emptyObjects
      ],
    },
  }
);

const mutationMock = apolloMock(
  SaveFinalLevelsMutation,
  { id: "1", nivelOral: 4, nivelFinal: 4 },
  { data: { saveOralResults: true } }
);

export default {
  title: "Test Results List",
  component: ResultsList,
  argTypes: {
    reloadPage: { action: "page reload" },
  },
  parameters: {
    apolloClient: {
      mocks: [defaultMock, assignedMock, mutationMock],
    },
  },
} as ComponentMeta<typeof ResultsList>;

const Template: ComponentStory<typeof ResultsList> = (args) => (
  <ResultsList {...args} />
);

export const Normal = Template.bind({});
