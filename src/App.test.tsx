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

const basicMocks = [
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
            hasPreviousPage: true,
          },
        },
      },
    }
  ),
];

const renderWithProvider = (Component: any, mocks?: any[]) => {
  const localMocks = mocks ? basicMocks.concat(mocks) : basicMocks;
  return render(
    <MockedProvider
      mocks={[
        ...localMocks,
        generateMock(
          PostResultsMutation,
          { ...applicantTestInfo, nivel_escrito: 1 },
          {}
        ),
        generateMock(
          PostResultsMutation,
          { ...applicantTestInfo, nivel_escrito: 2 },
          {}
        ),
        generateMock(
          PostResultsMutation,
          { ...applicantTestInfo, nivel_escrito: 3 },
          { data: { saveWrittenResults: { meetLink: "meetlink.com" } } }
        ),
      ]}
    >
      <Component />
    </MockedProvider>
  );
};

describe("nivel 1", () => {
  test("rendirse en nivel 1", async () => {
    renderWithProvider(App);

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    );

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

    userEvent.click(screen.getByRole("button", { name: /rendirse/i }));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(screen.getByText(/nivel 1/i)).toBeInTheDocument();
  });

  test("fallar nivel 1", async () => {
    renderWithProvider(App);

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    );

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
      within(screen.getByTestId("question0")).getByLabelText(/are/i),
      within(screen.getByTestId("question1")).getByLabelText(/e-book/i),
      within(screen.getByTestId("question2")).getByLabelText(/am/i),
      within(screen.getByTestId("question3")).getByLabelText("Jeniffers"),
      within(screen.getByTestId("question4")).getByLabelText(/when/i),
      within(screen.getByTestId("question5")).getByLabelText(/there are/i),
    ];

    answers.forEach((element) => userEvent.click(element));

    expect(screen.getByRole("button", { name: /continuar/i })).toBeEnabled();

    userEvent.click(screen.getByRole("button", { name: /continuar/i }));
    expect(screen.getByText(/nivel 1/i)).toBeInTheDocument();
  });
});

describe("nivel 2", () => {
  test("rendirse en nivel 2", async () => {
    renderWithProvider(App);

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    );

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

  test("fallar en nivel 2", async () => {
    renderWithProvider(App);

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    );

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

    //ANSWER LEVEL1
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

    //ANSWER LEVEL2 INCORRECT
    const answers2 = [
      within(screen.getByTestId("question0")).getByLabelText(/that/i),
      within(screen.getByTestId("question1")).getByLabelText(/gooder/i),
      within(screen.getByTestId("question2")).getByLabelText(/lots/i),
      within(screen.getByTestId("question3")).getByLabelText(/have/i),
      within(screen.getByTestId("question4")).getByLabelText(/do/i),
      within(screen.getByTestId("question5")).getByLabelText(/his/i),
    ];

    answers2.forEach((element) => userEvent.click(element));

    userEvent.click(screen.getByRole("button", { name: /continuar/i }));

    expect(screen.getByText(/nivel 2/i)).toBeInTheDocument();
  });
});

describe("nivel 3", () => {
  test("rendirse nivel 3", async () => {
    renderWithProvider(App, [
      generateMock(
        SectionPageQuery,
        { course: "en", level: 3 },
        {
          data: {
            section: {
              questions: db.sections[2].questions,
              pageInfo: {
                hasNextPage: true,
                hasPreviousPage: true,
              },
            },
          },
        }
      ),
    ]);

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    );

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

    //ANSWER LEVEL1
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

    //ANSWER LEVEL2 CORRECT
    const answers2 = [
      within(screen.getByTestId("question0")).getByLabelText(/these/i),
      within(screen.getByTestId("question1")).getByLabelText(/better/i),
      within(screen.getByTestId("question2")).getByLabelText(/any/i),
      within(screen.getByTestId("question3")).getByLabelText("having"),
      within(screen.getByTestId("question4")).getByLabelText(/did/i),
      within(screen.getByTestId("question5")).getByLabelText(/him/i),
    ];

    answers2.forEach((element) => userEvent.click(element));

    userEvent.click(screen.getByRole("button", { name: /continuar/i }));
    await waitForElementToBeRemoved(() => screen.queryByText(/cargando/i));

    expect(screen.getByText(/was living in barcelona/i)).toBeInTheDocument();

    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: /rendirse/i }));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText(/meetlink.com/i)).toBeInTheDocument();
  });

  test("enviar examen nivel 3", async () => {
    renderWithProvider(App, [
      generateMock(
        SectionPageQuery,
        { course: "en", level: 3 },
        {
          data: {
            section: {
              questions: db.sections[2].questions,
              pageInfo: {
                hasNextPage: false,
                hasPreviousPage: true,
              },
            },
          },
        }
      ),
    ]);

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    );

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

    //ANSWER LEVEL1
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

    //ANSWER LEVEL2 CORRECT
    const answers2 = [
      within(screen.getByTestId("question0")).getByLabelText(/these/i),
      within(screen.getByTestId("question1")).getByLabelText(/better/i),
      within(screen.getByTestId("question2")).getByLabelText(/any/i),
      within(screen.getByTestId("question3")).getByLabelText("having"),
      within(screen.getByTestId("question4")).getByLabelText(/did/i),
      within(screen.getByTestId("question5")).getByLabelText(/him/i),
    ];

    answers2.forEach((element) => userEvent.click(element));

    userEvent.click(screen.getByRole("button", { name: /continuar/i }));
    await waitForElementToBeRemoved(() => screen.queryByText(/cargando/i));

    expect(screen.getByText(/was living in barcelona/i)).toBeInTheDocument();

    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: /enviar examen/i }));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText(/meetlink.com/i)).toBeInTheDocument();
  });
});
