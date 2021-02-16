import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { GET_CARRERAS } from "./components/PersonalForm";
import { TEST_SECTION_QUERY } from "./components/Section";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import store from "./store";

type TestElement = Document | Element | Window | Node;

function hasInputValue(e: TestElement, inputValue: string) {
  return screen.getByDisplayValue(inputValue) === e;
}

const mocks = [
  {
    request: { query: GET_CARRERAS },
    result: {
      data: {
        carreras: [{ name: "Abogado" }],
        isClosed: false,
      },
    },
  },
  {
    request: {
      query: TEST_SECTION_QUERY,
      variables: { course: "fr", level: 1 },
    },
    result: {
      data: {
        section: {
          questions: [
            {
              title: "Question title",
              options: [
                {
                  text: "Option 1",
                  correct: false,
                },
                {
                  text: "Option 2",
                  correct: true,
                },
              ],
            },
          ],
          pageInfo: {
            hasNextPage: true,
            hasPreviousPage: false,
          },
        },
      },
    },
  },
];

describe("App", () => {
  test("Fills the personal information form", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <App />
        </Provider>
      </MockedProvider>
    );
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
      correo: screen.getByLabelText(/correo/i),
      curso: screen.getByTestId("curso"),
    };

    userEvent.type(inputs.codigo, "1234567890");
    userEvent.type(inputs.nombre, "Pedro");
    userEvent.type(inputs.paterno, "Paramo");
    userEvent.type(inputs.materno, "Preciado");
    userEvent.type(inputs.celular, "3411234567");
    userEvent.selectOptions(inputs.carrera, ["Abogado"]);
    userEvent.type(inputs.correo, "pedro@mail.com");
    userEvent.selectOptions(inputs.curso, ["fr"]);

    userEvent.click(screen.getByRole("button", { name: /enviar/i }));
    expect(await screen.findByText(/seccion/i)).toBeInTheDocument();
  });
});
