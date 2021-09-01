import React, { useState, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { advanceLevel } from "../store/actions";
import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Loading, Error } from "./utils/components";

import { RootState } from "../store/types";

import SectionComponent from "./Section";

export const TEST_SECTION_QUERY = gql`
  query($course: String!, $level: Int!) {
    logIn
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

const replaceAt = (arr: any, index: number, value: any) => [
  ...arr.slice(0, index),
  value,
  ...arr.slice(index + 1),
];

const sumArray = (arr: number[]) =>
  arr.reduce((acc: number, curr: number) => acc + curr);

type SectionProps = { handleGiveup: () => void };
const SectionPage: React.FC<any> = (props: SectionProps) => {
  const { level, course } = useSelector((state: RootState) => state.system);
  const history = useHistory();

  const handleQueryComplete: (data: any) => void = (data) =>
    localDispatch(actionCreators.resetValues(data.section.questions.length));
  const { data, loading, error } = useQuery(TEST_SECTION_QUERY, {
    variables: { course: course, level: level },
    onCompleted: handleQueryComplete,
  });

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
  const [resetOptions, setResetOptions] = useState(false);

  const dispatch = useDispatch();
  const nextLevel = (pass: boolean) => {
    if (pass) {
      dispatch(advanceLevel());
    } else {
      props.handleGiveup();
      history.push("/result");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error>{JSON.stringify(error)}</Error>;
  return (
    <SectionComponent
      course={course}
      level={level}
      questions={data ? data.section.questions : [0]}
      handleGiveup={() => {
        props.handleGiveup();
        history.push("/result");
      }}
      handleContinue={() => {
        nextLevel(localState.pass);
        setResetOptions(true);
        window.scrollTo(0, 0);
      }}
      handleSelection={(correct: boolean, index: number) => {
        localDispatch(actionCreators.setAnswers(index, correct));
        localDispatch(actionCreators.setAnsweredMin());
        localDispatch(actionCreators.checkExam());
      }}
      resetOptions={resetOptions}
      answeredMin={localState.answeredMin}
      hasNextPage={data.section.pageInfo.hasNextPage}
    />
  );
};

export default SectionPage;
