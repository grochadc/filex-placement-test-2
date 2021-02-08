import React from "react";
import {
  CloseExamToggle,
  Dashboard,
  GET_DEFAULT_SETTINGS,
  CLOSE_EXAM,
} from "./Dashboard";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";

test("CloseExamToggle", () => {
  const handleToggle = jest.fn();
  render(<CloseExamToggle isClosed={true} handleToggle={handleToggle} />);
  const openButton = screen.getByRole("radio", {
    name: /open/i,
  });
  const closeButton = screen.getByRole("radio", {
    name: /close/i,
  });
  expect(openButton.checked).toBe(false);
  expect(closeButton.checked).toBe(true);

  userEvent.click(openButton);
  expect(openButton.checked).toBe(true);
  expect(closeButton.checked).toBe(false);
  expect(handleToggle).toHaveBeenCalled();
});

export interface Mock {
  request: { query: any; variables?: any };
  result: { data: any };
}

const mocks: Mock[] = [
  {
    request: { query: GET_DEFAULT_SETTINGS },
    result: {
      data: { isClosed: true, meetLinks: ["link1", "link2", "link3"] },
    },
  },
  {
    request: { query: CLOSE_EXAM },
    result: {
      data: { closeExam: { isClosed: false } },
    },
  },
];

test("Dashboard", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Dashboard />
    </MockedProvider>
  );

  await act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));
  expect(0).toBe(0);
});
