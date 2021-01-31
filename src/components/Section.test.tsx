import React from "react";
import { Provider } from "react-redux";
import store from "../store";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen, act } from "@testing-library/react";
import Section from "./Section";
import { examSectionMock } from "../test-utils/gql-mocks";

test("Section", async () => {
  render(
    <MockedProvider mocks={[examSectionMock]} addTypename={false}>
      <Provider store={store}>
        <Section />
      </Provider>
    </MockedProvider>
  );
  await act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));
  screen.debug();
});
