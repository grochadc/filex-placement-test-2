import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ResultPage from ".";
import Header from "../../components/Header";

export default {
  title: "Pages/Result",
  component: ResultPage,
} as ComponentMeta<typeof ResultPage>;

const Template: ComponentStory<typeof ResultPage> = (args) => (
  <>
    <Header title="RESULTADOS" />
    <ResultPage {...args} />
  </>
);

const simpleApplicant = {
  nombre: "Benito Antonio",
  apellido_paterno: "Martinez",
  apellido_materno: "Ocasio",
  codigo: "1234567890",
  genero: "M",
  ciclo: "2022A",
  externo: false,
  telefono: "1234567890",
  carrera: "Abogado",
  reubicacion: false,
  email: "bad@bunny.pr",
  curso: "en",
};

export const HighLevel = Template.bind({});
HighLevel.args = {
  level: 5,
  meetLink: "https://meet.google.com/ahv-dje-kol",
};

export const LowLevel = Template.bind({});
LowLevel.args = {
  level: 1,
};
