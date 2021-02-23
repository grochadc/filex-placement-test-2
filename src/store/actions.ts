import {
  ActionTypes,
  Applicant,
  ADVANCE_LEVEL,
  FINISH_EXAM,
  SET_CURRENT_LINK,
  SET_APPLICANT,
  SET_ROUTE,
  CHANGE_LINK,
  SET_DEFAULT_LINKS,
  REMOVE_LINK,
  ADD_LINK,
  START_EXAM,
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

export function startExam(): ActionTypes {
  return {
    type: START_EXAM,
  };
}

export function setCurrentLink(link: string): ActionTypes {
  return {
    type: SET_CURRENT_LINK,
    payload: link,
  };
}

export function setApplicant(info: Applicant): ActionTypes {
  return {
    type: SET_APPLICANT,
    payload: info,
  };
}

export function setRoute(route: string): ActionTypes {
  return {
    type: SET_ROUTE,
    payload: route,
  };
}

export function changeLink(
  key: string,
  value: string,
  index: number
): ActionTypes {
  return {
    type: CHANGE_LINK,
    payload: { key, value, index },
  };
}

export function setDefaultLinks(links: string[]): ActionTypes {
  return {
    type: SET_DEFAULT_LINKS,
    payload: links,
  };
}

export function removeLink(index: number): ActionTypes {
  return {
    type: REMOVE_LINK,
    payload: { index },
  };
}

export function addLink(value: { teacher: string; link: string }): ActionTypes {
  return {
    type: ADD_LINK,
    payload: value,
  };
}
