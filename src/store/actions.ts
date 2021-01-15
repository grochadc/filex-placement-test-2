import {
  ActionTypes,
  Info,
  ADVANCE_LEVEL,
  FINISH_EXAM,
  SET_CURRENT_LINK,
  SET_INFO,
  SET_ROUTE,
} from "./types";

export function advanceLevel(): ActionTypes {
  return {
    type: ADVANCE_LEVEL,
  };
}

export function finishExam(): ActionTypes {
  return {
    type: FINISH_EXAM,
  };
}

export function setCurrentLink(link: string): ActionTypes {
  return {
    type: SET_CURRENT_LINK,
    payload: link,
  };
}

export function setInfo(info: Info): ActionTypes {
  return {
    type: SET_INFO,
    payload: info,
  };
}

export function setRoute(route: string): ActionTypes {
  return {
    type: SET_ROUTE,
    payload: route,
  };
}
