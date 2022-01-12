import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid gray;
  padding: 15px 35px;
  border-radius: 15px;
  margin: 1em;
  max-width: 500px;
`;

const OptionRadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  input {
    margin: 0.5em;
  }
`;

export interface QuestionProps {
  key: number;
  handleSelection: (correct: boolean, index: number) => void;
  questionObj: {
    title: string;
    options: {
      text: string;
      correct: boolean;
    }[];
  };
  questionIndex: number;
}

export const Question = (props: QuestionProps) => {
  return (
    <Container data-testid={`question${props.questionIndex}`}>
      <form
        onChange={(event: React.FormEvent<HTMLFormElement>) => {
          //@ts-ignore
          const currentIndex = Number(event.target.value);
          props.handleSelection(
            props.questionObj.options[currentIndex].correct,
            props.questionIndex
          );
        }}
      >
        <p>{`${props.questionIndex + 1}. ${props.questionObj.title}`}</p>
        <OptionRadioGroup>
          {props.questionObj.options.map((option, index) => (
            <span key={option.text}>
              <input
                type="radio"
                name="question1"
                value={index.toString()}
                id={`question${props.questionIndex}-answer${index.toString()}`}
              />
              <label
                htmlFor={`question${
                  props.questionIndex
                }-answer${index.toString()}`}
              >
                {props.questionObj.options[index].text}
              </label>
            </span>
          ))}
        </OptionRadioGroup>
      </form>
    </Container>
  );
};

export default Question;
