import React from "react";
import generateMock from "../../testutils/generatedMocks";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import HomePage, { HomePageQuery } from ".";
import Header from "../../components/Header";

export default {
  title: "Pages/Home",
  component: HomePage,
} as ComponentMeta<typeof HomePage>;

const Template: ComponentStory<typeof HomePage> = (args) => (
  <>
    <Header title="DATOS PERSONALES" />
    <HomePage {...args} />
  </>
);

export const Abierto = Template.bind({});
Abierto.parameters = {
  apolloClient: {
    mocks: [
      generateMock(
        HomePageQuery,
        {},
        { data: { isClosed: false, carreras: [{ name: "Abogado" }] } }
      ),
    ],
  },
};
Abierto.args = {
  onSubmitApplicantInformation: (data) => console.log(data),
};

export const Cerrado = Template.bind({});
Cerrado.parameters = {
  apolloClient: {
    mocks: [
      generateMock(
        HomePageQuery,
        {},
        { data: { isClosed: true, carreras: [{ name: "Abogado" }] } }
      ),
    ],
  },
};

export const AbiertoMensaje = Template.bind({});
AbiertoMensaje.parameters = {
  apolloClient: {
    mocks: [
      generateMock(
        HomePageQuery,
        {},
        {
          data: {
            isClosed: false,
            carreras: [{ name: "Abogado" }],
            placementHomePageMessage: {
              active: true,
              message: "Mensaje desde Storybook!",
            },
          },
        }
      ),
    ],
  },
};
