import React from "react";
import { render } from "@testing-library/react";
import Router from "./Router";

const App = () => {
  return (
    <Router defaultRoute={"home"}>
      <Router.View route="home">This is the homepage.</Router.View>
      <Router.View route="selection">This is the selection page.</Router.View>
    </Router>
  );
};

test("Renders without crashing [Snapshot]", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

test("Renders only one route and nothing else", () => {
  const { getByText, queryByText } = render(<App />);
  expect(getByText(/homepage/i)).toBeInTheDocument();
  expect(queryByText(/selection/i)).not.toBeInTheDocument();
});
