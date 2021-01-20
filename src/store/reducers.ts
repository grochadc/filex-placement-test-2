import {
  ActionTypes,
  Info,
  SET_CURRENT_LINK,
  ADVANCE_LEVEL,
  FINISH_EXAM,
  SET_DB_ERROR,
  SET_INFO,
  SET_ROUTE,
} from "./types";
import { generateCode } from "../lib";

import { useSelector, TypedUseSelectorHook } from "react-redux";

interface RootState {
  info: Info;
  route: string;
  course: string;
  code: string;
  level: number;
  currentLink: string;
  dbError: string;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const initialState: RootState = {
  info: {
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
  },
  route: window.location.pathname === "/dashboard" ? "dashboard" : "personal",
  course: "en",
  code: generateCode(1),
  level: 1,
  currentLink: "",
  dbError: "",
};

export const myReducer = (
  state = initialState,
  action: ActionTypes
): RootState => {
  switch (action.type) {
    case SET_ROUTE:
      return { ...state, route: action.payload };
    case SET_INFO:
      return { ...state, info: action.payload };
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
    default:
      return state;
  }
};
