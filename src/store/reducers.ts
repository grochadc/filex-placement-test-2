import { combineReducers } from "redux";
import {
  ActionTypes,
  SystemState,
  Applicant,
  RootState,
  SET_CURRENT_LINK,
  ADVANCE_LEVEL,
  FINISH_EXAM,
  SET_DB_ERROR,
  SET_APPLICANT,
  SET_ROUTE,
} from "./types";
import { generateCode } from "../lib";

import { useSelector, TypedUseSelectorHook } from "react-redux";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const initialStateSystem: SystemState = {
  route: window.location.pathname === "/dashboard" ? "dashboard" : "personal",
  course: "en",
  code: generateCode(1),
  level: 1,
  currentLink: "",
  dbError: "",
};

const system = (state = initialStateSystem, action: ActionTypes) => {
  switch (action.type) {
    case SET_ROUTE:
      return { ...state, route: action.payload };
    case SET_DB_ERROR:
      return { ...state, dbError: action.payload };
    case SET_CURRENT_LINK:
      return { ...state, currentLink: action.payload };
    case ADVANCE_LEVEL:
      return {
        ...state,
        code: generateCode(state.level + 1),
        level: state.level + 1,
      };
    case FINISH_EXAM:
      return { ...state, route: "result" };
    case SET_APPLICANT:
      return { ...state, course: action.payload.curso };
    default:
      return state;
  }
};

const initialStateApplicant: Applicant = {
  codigo: "",
  nombre: "",
  apellido_paterno: "",
  apellido_materno: "",
  genero: "",
  ciclo: "",
  carrera: "",
  telefono: "",
  email: "",
  nivel_escrito: 1,
  curso: "",
  externo: false,
  reubicacion: false,
};

const applicant = (state = initialStateApplicant, action: ActionTypes) => {
  switch (action.type) {
    case SET_APPLICANT:
      return action.payload;
    case ADVANCE_LEVEL:
      return { ...state, nivel_escrito: state.nivel_escrito + 1 };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ applicant, system });

export { rootReducer, useTypedSelector };
