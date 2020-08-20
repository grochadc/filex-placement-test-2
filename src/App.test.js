import React from "react";
import {
  render,
  screen,
  act,
  waitForElement,
  waitFor
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

const personalInfo = [
  { label: "Código:", value: "1234567890" },
  { label: "Nombre:", value: "Pedro" },
  { label: "Apellido Paterno:", value: "Paramo" },
  { label: "Apellido Materno:", value: "Preciado" },
  { label: "Teléfono Celular:", value: "3412345678" },
  { label: "Correo Electrónico:", value: "pedro@mail.com" },
  { label: "Carrera:", value: "Abogado" },
  { label: "Curso:", value: "english" }
];

describe("App", () => {
  test("Fills the personal information form", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await act(async () => {
      personalInfo.forEach(input =>
        userEvent.type(screen.getByLabelText(input.label), input.value)
      );
    });
    await act(async () => {
      userEvent.click(screen.getByText("Enviar"));
    });
    screen.debug();
  });

  test("Advances to next level on enough correct answers", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    let answers = ["is", "cellphone", "are", "Jeniffer's", "What", "There is"];

    await act(async () => {
      personalInfo.forEach(input =>
        userEvent.type(screen.getByLabelText(input.label), input.value)
      );
      userEvent.click(screen.getByText("Enviar"));

      await waitForElement(() => {
        expect(
          screen.getByText("1. Jessica _______ a good dancer.")
        ).toBeInTheDocument();
      });
    });

    await act(async () => {
      answers.forEach(answer => {
        userEvent.click(screen.getByLabelText(answer));
      });
      userEvent.click(screen.getByText("Siguiente Seccion"));
    });
    expect(screen.getByText("Seccion 2")).toBeInTheDocument();
  });
});
