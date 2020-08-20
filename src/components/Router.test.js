import React from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router, Show } from "./Router";

const myReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
    case "route":
      return { ...state, route: action.payload };
  }
};

const store = createStore(myReducer, { route: "home" });

const Button = props => {
  return <button onClick={props.handleClick}>Enviar</button>;
};

const VisibleButton = connect(
  null,
  dispatch => {
    return { handleClick: () => dispatch({ type: "route", payload: "index" }) };
  }
)(Button);

const VisibleRouter = connect(state => {
  return { route: state.route };
})(Router);

const App = () => {
  return (
    <Provider store={store}>
      <VisibleRouter>
        <Show route="home">
          <h1>Home</h1>
          <VisibleButton />
        </Show>
        <Show route="index">
          <h1>Index</h1>
        </Show>
      </VisibleRouter>
    </Provider>
  );
};

describe("Router", () => {
  test("Screen changes on button click", async () => {
    render(<App />);
    act(() => {
      userEvent.click(screen.getByText("Enviar"));
    });
    expect(screen.getByText("Index")).toBeInTheDocument();
  });
});
