import React from "react";
import {
  render,
  screen,
  act,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import generateMock from "./testutils/generatedMocks";

import App, { PostResultsMutation } from "./App";
import { HomePageQuery } from "./pages/HomePage";
import { SectionPageQuery } from "./pages/SectionPage";
import { questions as mockQuestions } from "./pages/mockData";
import db from "./testutils/mockQuestions";

const applicantTestInfo = {
  codigo: "1234567890",
  nombre: "Benito Antonio",
  apellido_paterno: "Martinez",
  apellido_materno: "Ocasio",
  genero: "M",
  ciclo: "2021B",
  carrera: "Abogado",
  telefono: "3411234567",
  email: "bad@bunny.pr",
  institucionalEmail: "benito.martinez@alumnos.udg.mx",
  externo: false,
  reubicacion: false,
  nivel_escrito: 2,
  curso: "en",
};

test("completes the exam for level 1", async () => {
  render(
    <MockedProvider
      mocks={[
        generateMock(
          HomePageQuery,
          {},
          { data: { isClosed: false, carreras: [{ name: "Abogado" }] } }
        ),
        generateMock(
          SectionPageQuery,
          { course: "en", level: 1 },
          {
            data: {
              section: {
                questions: db.sections[0].questions,
                pageInfo: {
                  hasNextPage: true,
                  hasPreviousPage: false,
                },
              },
            },
          }
        ),
        generateMock(
          SectionPageQuery,
          { course: "en", level: 2 },
          {
            data: {
              section: {
                questions: db.sections[1].questions,
                pageInfo: {
                  hasNextPage: true,
                  hasPreviousPage: false,
                },
              },
            },
          }
        ),
        generateMock(
          PostResultsMutation,
          { ...applicantTestInfo },
          { data: { saveWrittenResults: { meetLink: "meetlink.com" } } }
        ),
      ]}
    >
      <App />
    </MockedProvider>
  );

  await act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));

  const inputs = {
    codigo: screen.getByLabelText(/código/i),
    nombre: screen.getByLabelText(/nombre/i),
    paterno: screen.getByLabelText(/paterno/i),
    materno: screen.getByLabelText(/materno/i),
    celular: screen.getByLabelText(/celular/i),
    carrera: screen.getByTestId("carrera"),
    correo: screen.getByLabelText(/correo electrónico/i),
    correoInstitucional: screen.getByLabelText(/institucional/i),
    curso: screen.getByTestId("curso"),
    ciclo: screen.getByLabelText(/ciclo/i),
  };

  userEvent.type(inputs.codigo, "1234567890");
  userEvent.type(inputs.nombre, "Benito Antonio");
  userEvent.type(inputs.paterno, "Martinez");
  userEvent.type(inputs.materno, "Ocasio");
  userEvent.type(inputs.celular, "3411234567");
  userEvent.selectOptions(inputs.carrera, ["Abogado"]);
  userEvent.type(inputs.correo, "bad@bunny.pr");
  userEvent.type(
    inputs.correoInstitucional,
    applicantTestInfo.institucionalEmail
  );
  userEvent.selectOptions(inputs.curso, ["en"]);
  userEvent.type(inputs.ciclo, applicantTestInfo.ciclo);

  await act(async () => {
    userEvent.click(screen.getByRole("button", { name: /enviar/i }));
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  await waitForElementToBeRemoved(() => screen.queryByText(/cargando/i));

  const answers = [
    within(screen.getByTestId("question0")).getByLabelText(/is/i),
    within(screen.getByTestId("question1")).getByLabelText(/cellphone/i),
    within(screen.getByTestId("question3")).getByLabelText(/jeniffer's/i),
    within(screen.getByTestId("question2")).getByLabelText(/are/i),
    within(screen.getByTestId("question4")).getByLabelText(/what/i),
    within(screen.getByTestId("question5")).getByLabelText(/there is/i),
  ];

  answers.forEach((element) => userEvent.click(element));

  expect(screen.getByRole("button", { name: /continuar/i })).toBeEnabled();

  userEvent.click(screen.getByRole("button", { name: /continuar/i }));
  await waitForElementToBeRemoved(() => screen.queryByText(/cargando/i));

  expect(screen.getByText(/jeans fit me/i)).toBeInTheDocument();

  userEvent.click(screen.getByRole("button", { name: /rendirse/i }));

  expect(screen.getByText(/nivel 2/i)).toBeInTheDocument();
});
