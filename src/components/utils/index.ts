import React from "react";
import * as R from "ramda";

type State = any;
type Dispatch = any;
type StoreAPI = [State, Dispatch];

interface Middleware {
  (storeAPI: StoreAPI): any;
}

export const useReducerMiddleware = (
  reducer: any,
  intialValue: any,
  middlewares: Middleware[]
) => {
  const [state, dispatch]: [
    any,
    React.DispatchWithoutAction
  ] = React.useReducer(reducer, intialValue);
  const myChain = middlewares.map((middleware) =>
    middleware([state, dispatch])
  );

  const composeArray = (arr: any[]) =>
    R.reduceRight(R.compose, R.identity, arr);

  const dispatchWithMiddleware = composeArray(myChain)(dispatch);

  return [state, dispatchWithMiddleware];
};
