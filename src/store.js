import { createStore } from "redux";
import { generateCode } from "./lib";

const now = new Date();

console.log(now.getHours());

const linksMorning = [
  "https://meet.google.com/kzx-emdw-tac",
  "https://meet.google.com/wqf-dmjq-qza",
  "https://meet.google.com/zym-djkh-kmc",
  "https://meet.google.com/huz-dbiq-hry",
  "https://meet.google.com/huz-dbiq-hry"
];
const linksAfternoon = [
  "https://meet.google.com/dkg-zqni-phx",
  "https://meet.google.com/jao-wiqv-kmn",
  "https://meet.google.com/jvp-ijky-bjy",
  "https://meet.google.com/xni-zart-qav",
  "https://meet.google.com/baw-iuzn-mbj"
];
const timeLinks = now.getHours() > 14 ? linksAfternoon : linksMorning;

const initialValues = {
  info: "",
  route: "personal",
  code: generateCode(1),
  level: 1,
  finished: false,
  meetLinks: timeLinks,
  counterLinks: 0,
  currentLink: "",
  dbError: ""
};

const myReducer = (state, action) => {
  switch (action.type) {
    case "route":
      return { ...state, route: action.payload };
    case "info":
      return { ...state, info: action.payload };
    case "SET_DB_ERROR":
      return { ...state, dbError: action.payload };
    case "SET_MEET_LINK_COUNTER":
      return { ...state, currentLink: state.meetLinks[action.payload] };
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
