import { myReducer } from "./reducers";
import { createStore } from "redux";

let store = createStore(
  myReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
