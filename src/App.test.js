import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { GET_CARRERAS } from "./components/PersonalForm";
import { TEST_SECTION_QUERY } from "./components/Section";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import store from "./store";

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
      variables: { course: "en", level: 1 },
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

    act(() => {
      userEvent.type(screen.getByLabelText(/código/i), "1234567890");
      userEvent.type(screen.getByLabelText(/nombre/i), "Pedro");
      userEvent.type(screen.getByLabelText(/paterno/i), "Paramo");
      userEvent.type(screen.getByLabelText(/materno/i), "Preciado");
      userEvent.type(screen.getByLabelText(/celular/i), "3411234567");
      userEvent.selectOptions(screen.getByTestId("carrera"), ["Abogado"]);
      userEvent.type(screen.getByLabelText(/correo/i), "pedro@mail.com");
      userEvent.selectOptions(screen.getByTestId("curso"), ["french"]);
    });
    userEvent.click(screen.getByRole("button", { name: /enviar/i }));
    expect(await screen.findByText(/seccion/i)).toBeInTheDocument();
  });
});
