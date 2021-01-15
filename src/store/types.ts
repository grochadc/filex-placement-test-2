export interface Info {
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

export interface State {
  info: Info | null;
  course: string;
  route: string;
  code: string;
  level: number;
  finished: boolean;
  counterLinks: number;
  currentLink: string;
  dbError: string;
}

export const SET_DB_ERROR = "SET_DB_ERROR";
export const SET_CURRENT_LINK = "SET_CURRENT_LINK";
export const ADVANCE_LEVEL = "ADVANCE_LEVEL";
export const FINISH_EXAM = "FINISH_EXAM";
export const SET_INFO = "SET_INFO";
export const SET_ROUTE = "SET_ROUTE";

interface setCurrentLinkAction {
  type: typeof SET_CURRENT_LINK;
  payload: string;
}

interface advanceLevelAction {
  type: typeof ADVANCE_LEVEL;
}

interface finishExamAction {
  type: typeof FINISH_EXAM;
}

interface setDbErrorAction {
  type: typeof SET_DB_ERROR;
  payload: string;
}

interface setInfoAction {
  type: typeof SET_INFO;
  payload: any;
}

interface setRouteAction {
  type: typeof SET_ROUTE;
  payload: string;
}

export type ActionTypes =
  | setCurrentLinkAction
  | advanceLevelAction
  | finishExamAction
  | setDbErrorAction
  | setInfoAction
  | setRouteAction;
