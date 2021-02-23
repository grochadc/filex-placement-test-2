export interface Applicant {
  codigo: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  genero: string;
  ciclo: string;
  carrera: string;
  telefono: string;
  email: string;
  nivel_escrito: number;
  curso: string;
  externo: boolean;
  reubicacion: boolean;
}

export interface SystemState {
  route: string;
  isDoingExam: boolean;
  course: string;
  code: string;
  level: number;
  currentLink: string;
  dbError: string;
}

export interface RootState {
  applicant: Applicant;
  system: SystemState;
  settings: {
    links: string[];
  };
}

export const SET_DB_ERROR = "SET_DB_ERROR";
export const SET_CURRENT_LINK = "SET_CURRENT_LINK";
export const ADVANCE_LEVEL = "ADVANCE_LEVEL";
export const FINISH_EXAM = "FINISH_EXAM";
export const SET_APPLICANT = "SET_APPLICANT";
export const SET_ROUTE = "SET_ROUTE";
export const CHANGE_LINK = "CHANGE_LINK";
export const REMOVE_LINK = "REMOVE_LINK";
export const SET_DEFAULT_LINKS = "SET_DEFAULT_LINKS";
export const ADD_LINK = "ADD_LINK";
export const START_EXAM = "START_EXAM";

interface setCurrentLinkAction {
  type: typeof SET_CURRENT_LINK;
  payload: string;
}

interface advanceLevelAction {
  type: typeof ADVANCE_LEVEL;
}

interface startExamAction {
  type: typeof START_EXAM;
}

interface finishExamAction {
  type: typeof FINISH_EXAM;
}

interface setDbErrorAction {
  type: typeof SET_DB_ERROR;
  payload: string;
}

interface setInfoAction {
  type: typeof SET_APPLICANT;
  payload: any;
}

interface setRouteAction {
  type: typeof SET_ROUTE;
  payload: string;
}

interface removeLinkAction {
  type: typeof REMOVE_LINK;
  payload: { index: number };
}

interface changeLinkAction {
  type: typeof CHANGE_LINK;
  payload: { key: string; index: number; value: string };
}

interface setDefaultLinksAction {
  type: typeof SET_DEFAULT_LINKS;
  payload: string[];
}

interface addLinkAction {
  type: typeof ADD_LINK;
  payload: any;
}

export type ActionTypes =
  | setCurrentLinkAction
  | advanceLevelAction
  | finishExamAction
  | setDbErrorAction
  | setInfoAction
  | setRouteAction
  | removeLinkAction
  | changeLinkAction
  | setDefaultLinksAction
  | addLinkAction
  | startExamAction;
