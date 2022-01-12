import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Question from "./Question";

test("Questions works correctly", () => {
  render(
    <Question
      key={1}
      handleSelection={(correct, index) =>
        console.log("correct", correct, "index", index)
      }
      questionIndex={0}
      questionObj={{
        title: "Question title",
        options: [
          { correct: false, text: "first answer" },
          { correct: true, text: "second answer" },
          { correct: false, text: "third answer" },
        ],
      }}
    />
  );

  const answer = screen.getByLabelText(/first/i);
  userEvent.click(answer);
  expect(answer).toBeChecked();
});
