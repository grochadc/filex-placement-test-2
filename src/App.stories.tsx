import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import generateMock from "./testutils/generatedMocks";
import { PostResultsMutationVariables } from "./generated/grapqhl";

import App, { PostResultsMutation } from "./App";
import { HomePageQuery } from "./pages/HomePage";
import { SectionPageQuery } from "./pages/SectionPage";
import { DashboardPageQuery } from "./pages/DashboardPage";

import { withRouter } from 'storybook-addon-react-router-v6';

const testApplicant: PostResultsMutationVariables = {
  codigo: "1234567890",
  nombre: "Benito Antonio",
  apellidoPaterno: "Martinez",
  apellidoMaterno: "Ocasio",
  genero: "M",
  email: "bad@bunny.pr",
  institucionalEmail: "benito.martinez@alumnos.udg.mx",
  telefono: "3121234567",
  carrera: "Carrera-name",
  curso: "en",
  ciclo: "2021B",
  externo: false,
  reubicacion: false,
  nivelEscrito: 1,
};

export default {
  title: "App",
  component: App,
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: '/'
    },
    apolloClient: {
      mocks: [
        generateMock(
          HomePageQuery,
          {},
          {
            data: {
              carreras: [{}],
              placementHomePageMessage: {
                active: true,
              },
            },
          }
        ),
        generateMock(
          SectionPageQuery,
          { course: "en", level: 1 },
          {
            data: {
              section: {
                questions: [{ options: [{}] }],
                pageInfo: { hasNextPage: true },
              },
            },
          }
        ),
        generateMock(
          PostResultsMutation,
          //@ts-ignore
          { ...testApplicant },
          { data: { saveWrittenResults: { meetLink: "meetlink.com" } } }
        ),
      ],
    },
  },
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const Normal = Template.bind({});
