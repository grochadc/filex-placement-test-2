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

export function changeLink(value: string, index: number): ActionTypes {
  return {
    type: CHANGE_LINK,
    payload: { value, index },
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

export function addLink(value: string): ActionTypes {
  return {
    type: ADD_LINK,
    payload: value,
  };
}
