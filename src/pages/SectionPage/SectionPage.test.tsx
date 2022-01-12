import React from "react";
import { render, screen, act, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import generateMock from "../../testutils/generatedMocks";

import SectionPage, { SectionPageQuery } from ".";
import db from "../../testutils/mockQuestions";

test("fills answers correctly", async () => {
  const onNextLevel = jest.fn();
  render(
    <MockedProvider
      mocks={[
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
      ]}
    >
      <SectionPage
        onFinishExam={() => console.log("Finished exam")}
        onNextLevel={onNextLevel}
        currentLevel={1}
        course="en"
      />
    </MockedProvider>
  );

  await act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));

  const answers = [
    within(screen.getByTestId("question0")).getByLabelText(/is/i),
    within(screen.getByTestId("question1")).getByLabelText(/cellphone/i),
    within(screen.getByTestId("question2")).getByLabelText(/are/i),
    within(screen.getByTestId("question3")).getByLabelText(/jeniffer's/i),
    within(screen.getByTestId("question4")).getByLabelText(/what/i),
    within(screen.getByTestId("question5")).getByLabelText(/there is/i),
  ];

  answers.forEach((element) => userEvent.click(element));

  const ContinueButton = screen.getByRole("button", { name: /continuar/i });
  expect(ContinueButton).toBeEnabled();

  userEvent.click(ContinueButton);
  expect(onNextLevel).toHaveBeenCalledTimes(1);
});
