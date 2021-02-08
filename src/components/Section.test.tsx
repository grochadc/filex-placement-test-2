import React from "react";
import { Provider } from "react-redux";
import store from "../store";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen, act } from "@testing-library/react";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import Section from "./Section";
import { examSectionMocks } from "../test-utils/gql-mocks";

const withinView = (screen, containerId, optionId) => {
  const view = screen.getByTestId(containerId);
  const answer = within(view).getByTestId(optionId);
  return answer;
};

const waitForData = () =>
  act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));

test("Section", async () => {
  window.scrollTo = (x, y) => {};
  render(
    <MockedProvider mocks={examSectionMocks} addTypename={false}>
      <Provider store={store}>
        <Section />
      </Provider>
    </MockedProvider>
  );
  await waitForData();

  const continuarButton = screen.getByRole("button", { name: /continuar/i });

  expect(continuarButton.disabled).toBe(true);

  const answer1 = withinView(screen, "questionContainer0", "option3");
  userEvent.click(answer1);
  expect(answer1.checked).toBe(true);

  const answer2 = withinView(screen, "questionContainer1", "option1");
  userEvent.click(answer2);
  expect(answer2.checked).toBe(true);

  const answer3 = withinView(screen, "questionContainer2", "option1");
  userEvent.click(answer3);
  expect(answer3.checked).toBe(true);

  const answer4 = withinView(screen, "questionContainer3", "option2");
  userEvent.click(answer4);
  expect(answer4.checked).toBe(true);

  const answer5 = withinView(screen, "questionContainer4", "option2");
  userEvent.click(answer5);
  expect(answer5.checked).toBe(true);

  const answer6 = withinView(screen, "questionContainer5", "option1");
  userEvent.click(answer6);
  expect(answer6.checked).toBe(true);

  expect(continuarButton.disabled).toBe(false);
  userEvent.click(continuarButton);

  await waitForData();

  expect(screen.getByText(/Seccion 2/i)).toBeInTheDocument();
});
