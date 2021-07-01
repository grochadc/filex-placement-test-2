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
      data: {
        isClosed: true,
        meetLinks: [
          {
            teacher: "Gissel",
            link: "https://meet.google.com/trk-uzmy-efn",
            active: false,
          },
          {
            teacher: "Sergio",
            link: "https://meet.google.com/omn-hwhu-mtn",
            active: false,
          },
          {
            teacher: "Carlos",
            link: "https://meet.google.com/moh-ngxa-fqh",
            active: false,
          },
        ],
      },
    },
  },
  {
    request: { query: CLOSE_EXAM },
    result: {
      data: { closeExam: { isClosed: false } },
    },
  },
];

describe("Dashboard", async () => {
  beforeEach(async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Dashboard />
      </MockedProvider>
    );
    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    );
  });

  it("adds an empty link component", async () => {
    const addLinkButton = await screen.findByRole("button", {
      name: /add link/i,
    });
    userEvent.click(addLinkButton);

    const emptyInputs = await screen.findAllByDisplayValue("");
    expect(emptyInputs.length).toBe(2);
  });

  it("removes the first link", async () => {
    const teacherInput = await screen.findByDisplayValue("Gissel");
    const linkInput = await screen.findByDisplayValue(
      "https://meet.google.com/trk-uzmy-efn"
    );
    const removeButtons = await screen.findAllByRole("button", {
      name: /remove link/i,
    });
    expect(teacherInput).toBeInTheDocument();
    expect(linkInput).toBeInTheDocument();

    userEvent.click(removeButtons[0]);

    const removedTeacher = screen.queryByDisplayValue("Gissel");
    const removedLink = screen.queryByDisplayValue(
      "https://meet.google.com/trk-uzmy-efn"
    );
    expect(removedTeacher).toBeNull();
    expect(removedLink).toBeNull();
  });
});
