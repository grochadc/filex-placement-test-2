import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Question from "./Question";

test("It renders correcty", () => {
  const { asFragment } = render(
    <Question
      key={1}
      handleSelection={(correct) => console.log(correct)}
      questionObj={{
        title: "Question number 2",
        options: [
          { text: "Option 1", correct: false },
          { text: "Option 2", correct: true },
          { text: "Option 3", correct: false },
        ],
      }}
      questionIndex={1}
      resetOptions={false}
    />
  );
  expect(asFragment).toMatchSnapshot();
});

test("It checks the first option", () => {
  const handleSelection = jest.fn();
  render(
    <Question
      key={1}
      handleSelection={handleSelection}
      questionObj={{
        title: "Question number 2",
        options: [
          { text: "Option 0", correct: false },
          { text: "Option 1", correct: true },
          { text: "Option 2", correct: false },
        ],
      }}
      questionIndex={1}
      resetOptions={false}
    />
  );

  const option = screen.getByTestId("option1");
  userEvent.click(option);
  expect(option.checked).toBe(true);
  expect(handleSelection).toHaveBeenCalledWith(true);
});
