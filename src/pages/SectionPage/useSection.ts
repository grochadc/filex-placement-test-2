import { useReducer } from "react";

/* The useSection hook is going to be called everytime the user answers a question */

const replaceAt = (arr: any[], index: number, value: any) => [
  ...arr.slice(0, index),
  value,
  ...arr.slice(index + 1),
];

const sumArray = (arr: number[]) =>
  arr.reduce((acc: number, curr: number) => acc + curr);

function useSection(questionQuantity: number = 10) {
  const initialState = {
    answers: new Array(10).fill(0),
    checked: new Array(10).fill(0),
    pass: false,
    answeredMin: false,
  };
  const reducer = (
    state: any,
    action: {
      type: "SET_ANSWERS" | "RESET_VALUES" | "SET_ANSWEREDMIN" | "CHECK_EXAM";
      payload?: any;
    }
  ) => {
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
        return initialState;
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const answerQuestion = (index: number, correct: boolean) => {
    dispatch({ type: "SET_ANSWERS", payload: { index, correct } });
    dispatch({ type: "SET_ANSWEREDMIN" });
    dispatch({ type: "CHECK_EXAM" });
  };
  const resetValues = () => dispatch({ type: "RESET_VALUES" });
  return [state, answerQuestion, resetValues];

}
export default useSection;
