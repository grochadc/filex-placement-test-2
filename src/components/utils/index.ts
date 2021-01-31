import React from "react";
import * as R from "ramda";

export interface Action {
  type: string;
  payload: any;
}
export type State = any | undefined;
export interface Dispatch {
  (action: Action): any;
}
export type StoreAPI = [State, Dispatch | React.DispatchWithoutAction];

export interface Middleware {
  (storeAPI: StoreAPI): MiddlewareWithoutStore;
}

export interface MiddlewareWithoutStore {
  (next: (action: Action) => MiddlewareWithoutStore): (action: Action) => any;
}

export interface Reducer {
  (state: State, action: Action): State;
}

export const useReducerMiddleware = (
  reducer: Reducer,
  intialValue: State,
  middlewares: Middleware[]
) => {
  const store: StoreAPI = React.useReducer(reducer, intialValue);
  const [state, dispatch] = store;
  const myChain = middlewares.map((middleware) => middleware(store));

  const composeArray = (arr: any[]) =>
    R.reduceRight(R.compose, R.identity, arr);

  const dispatchWithMiddleware = composeArray(myChain)(dispatch);

  return [state, dispatchWithMiddleware];
};
