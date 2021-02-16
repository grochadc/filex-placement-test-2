import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Result from "./components/Result";
import Section from "./components/Section";
import PersonalForm from "./components/PersonalForm";
import Dashboard from "./components/Dashboard";
import { Header } from "./components/componentUtils";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setRoute } from "./store/actions";

function App() {
  const dispatch = useDispatch();
  const handleGiveup = () => {
    dispatch(setRoute("result"));
  };
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/test">
          <Section handleGiveup={handleGiveup} />
        </Route>
        <Route path="/result">
          <Result />
        </Route>
        <Route path="/">
          <Header>
            <h3>Datos Personales</h3>
          </Header>
          <PersonalForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
