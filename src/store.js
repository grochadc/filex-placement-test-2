import { createStore } from "redux";
import { generateCode } from "./lib";

const initialValues = {
  info: "",
  route: "personal",
  code: generateCode(1),
  level: 1,
  finished: false
};

const myReducer = (state, action) => {
  switch (action.type) {
    case "route":
      return { ...state, route: action.payload };
    case "info":
      return { ...state, info: action.payload };
    case "ADVANCE_LEVEL":
      return {
        ...state,
        code: generateCode(state.level + 1),
        level: state.level + 1
      };
    case "FINISH_EXAM":
      return { ...state, route: "result", finished: true };
    default:
      return state;
  }
};

let store = createStore(
  myReducer,
  initialValues,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
