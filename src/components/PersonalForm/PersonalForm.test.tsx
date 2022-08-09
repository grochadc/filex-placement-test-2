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
import generateMock from "../../testutils/generatedMocks";

import PersonalForm from ".";

import { HomePageQuery } from "../../pages/HomePage";

const applicantTestInfo = {
  codigo: "1234567890",
  nombre: "Benito Antonio",
  apellido_paterno: "Martinez",
  apellido_materno: "Ocasio",
  genero: "M",
  ciclo: "2022B",
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
];

const renderWithProvider = (Component: any, mocks?: any[]) => {
  const localMocks = mocks ? basicMocks.concat(mocks) : basicMocks;
  return render(
    <MockedProvider
      mocks={[
        ...localMocks,
      ]}
    >
      <Component />
    </MockedProvider>
  );
};

describe("Personal form", () => {
  test("completes and submits form", async () => {

    const OnSubmitFn = jest.fn();

    render(<PersonalForm 
                disabled={false} 
                onSubmit={() => OnSubmitFn() }
                carreras={["Abogado", "Periodismo"]}
                />)

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
      ciclo: screen.getByLabelText(/ciclo de ingreso/i),
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
    userEvent.type(screen.getByLabelText(/ciclo de ingreso/i), "2022B");

    expect(screen.getByLabelText(/código/i)).toHaveValue("1234567890");
    expect(screen.getByLabelText(/nombre/i)).toHaveValue("Benito Antonio");
    expect(screen.getByLabelText(/paterno/i)).toHaveValue("Martinez");
    expect(screen.getByLabelText(/materno/i)).toHaveValue("Ocasio");
    expect(screen.getByLabelText(/celular/i)).toHaveValue("3411234567");
    expect(screen.getByTestId("carrera")).toHaveValue("Abogado");
    expect(screen.getByLabelText(/correo electrónico/i)).toHaveValue("bad@bunny.pr");
    expect(screen.getByLabelText(/institucional/i)).toHaveValue(applicantTestInfo.institucionalEmail);
    expect(screen.getByTestId("curso")).toHaveValue("en");
    //expect(screen.getByLabelText(/ciclo de ingreso/i)).toHaveValue("2022B");

    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: /iniciar/i }));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(OnSubmitFn).toHaveBeenCalled();
  });
});
