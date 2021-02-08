import React, { useState } from "react";
import Form from "react-bootstrap/Form";

type Option = {
  text: string;
  correct: boolean;
};
export interface QuestionProps {
  key: number;
  handleSelection: (correct: boolean) => void;
  questionObj: {
    title: string;
    options: Option[];
  };
  questionIndex: number;
  resetOptions: boolean;
}

const Question = (props: QuestionProps) => {
  const [checkedOption, setCheckedOption] = useState<number | undefined>();
  return (
    <div>
      <ul>
        <Form
          onChange={(event: any) => {
            let currentIndex = parseInt(event.target.name); //target.name
            setCheckedOption(currentIndex);
            props.handleSelection(
              props.questionObj.options[currentIndex].correct
            );
          }}
        >
          <span>{`${props.questionIndex + 1}. ${
            props.questionObj.title
          }`}</span>
          <div data-testid={`questionContainer${props.questionIndex}`}>
            {props.questionObj.options.map((option, index) => (
              <Form.Check
                type="radio"
                label={option.text}
                key={index}
                name={index.toString()}
                checked={index === checkedOption ? true : false}
                onChange={() => true}
                data-testid={`option${index}`}
              />
            ))}
          </div>
        </Form>
      </ul>
    </div>
  );
};
export default Question;
