import React, { useState, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { advanceLevel } from "../store/actions";
import { gql } from "@apollo/client";
//import { useHistory } from "react-router-dom";
import Question from "./Question";
import Button from "react-bootstrap/Button";
import { Header } from "./componentUtils";
import { Loading, Error } from "./utils/components";

import { RootState } from "../store/types";

import { useTestSectionQuery } from "../generated/grapqhl";

export const TEST_SECTION_QUERY = gql`
  query testSection($course: String!, $level: Int!) {
    section(course: $course, level: $level) {
      questions {
        title
        options {
          text
          correct
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const replaceAt = (arr: any[], index: number, value: any) => [
  ...arr.slice(0, index),
  value,
  ...arr.slice(index + 1),
];

const sumArray = (arr: number[]) =>
  arr.reduce((acc: number, curr: number) => acc + curr);

type SectionProps = { handleGiveup: () => void };
const Section: React.FC<any> = (props: SectionProps) => {
  const { level, course } = useSelector((state: RootState) => state.system);
  //const history = useHistory();

  const handleQueryComplete: (data: any) => void = (data) =>
    localDispatch(actionCreators.resetValues(data.section.questions.length));
  const { data, loading, error } = useTestSectionQuery({
    variables: { course: course, level: level },
    onCompleted: handleQueryComplete,
  });

  const questions = data?.section ? data.section.questions : [0];

  const initialState = {
    answers: new Array(10).fill(0),
    checked: new Array(10).fill(0),
    pass: false,
    answeredMin: false,
  };
  const reducer = (state: any, action: { type: string; payload?: any }) => {
    switch (action.type) {
      case "SET_ANSWERS":
        return {
          ...state,
          answers: replaceAt(
            state.answers,
            action.payload.index,
            action.payload.correct ? 1 : 0
          ),
          checked: replaceAt(state.checked, action.payload.index, 1),
        };
      case "RESET_VALUES":
        return {
          ...state,
          answers: new Array(action.payload.quantity).fill(0),
          checked: new Array(action.payload.quantity).fill(0),
          pass: false,
          answeredMin: false,
        };
      case "SET_ANSWEREDMIN":
        return {
          ...state,
          answeredMin: sumArray(state.checked) > state.answers.length / 2,
        };
      case "CHECK_EXAM":
        return {
          ...state,
          pass: sumArray(state.answers) > state.answers.length / 2,
        };
      default:
        return state;
    }
  };

  const actionCreators = {
    setAnswers: (index: number, correct: boolean) => {
      return {
        type: "SET_ANSWERS",
        payload: { index: index, correct: correct },
      };
    },
    resetValues: (quantity: number) => {
      return { type: "RESET_VALUES", payload: { quantity: quantity } };
    },
    checkExam: () => {
      return { type: "CHECK_EXAM" };
    },
    setAnsweredMin: () => {
      return { type: "SET_ANSWEREDMIN" };
    },
  };
  const [localState, localDispatch] = useReducer(reducer, initialState);

  const dispatch = useDispatch();
  const nextLevel = (pass: boolean) => {
    if (pass) {
      dispatch(advanceLevel());
    } else {
      props.handleGiveup();
      //history.push("/result");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error e={error} />;
  return (
    <div>
      <Header>
        <h2>{course === "en" ? "Inglés" : "Francés"}</h2>
        <h3>Seccion {level}</h3>
      </Header>
      {questions.map((question: any, index: number) => {
        return (
          <Question
            key={index}
            handleSelection={(correct: boolean) => {
              localDispatch(actionCreators.setAnswers(index, correct));
              localDispatch(actionCreators.setAnsweredMin());
              localDispatch(actionCreators.checkExam());
            }}
            questionObj={question}
            questionIndex={index}
          />
        );
      })}
      <br />
      <Button
        variant="primary"
        onClick={() => {
          //history.push("/result");
          props.handleGiveup();
        }}
      >
        Rendirse
      </Button>
      {
        //@ts-ignore
        data?.section.pageInfo.hasNextPage ? (
          <Button
            disabled={!localState.answeredMin}
            variant="primary"
            onClick={() => {
              nextLevel(localState.pass);
              window.scrollTo(0, 0);
            }}
          >
            Continuar Examen
          </Button>
        ) : (
          <Button
            onClick={() => {
              props.handleGiveup();
              //history.push("/result");
            }}
          >
            Calificar examen
          </Button>
        )
      }
    </div>
  );
};

export default Section;
