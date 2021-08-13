import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Result from "./components/Result";
import Section from "./components/Section";
import PersonalForm from "./components/PersonalForm";
import Dashboard from "./components/Dashboard/index";
import { Header } from "./components/componentUtils";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRoute } from "./store/actions";

function updateDocumentTitle() {
  let currentTitle = document.title;
  if (window.location.hostname === "localhost") {
    document.title = `LOCAL ${currentTitle}`;
  }
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    updateDocumentTitle();
  });
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
      <>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSd3Q1mA6cdkxBQxgbuo4rc6O2dkZXaBK_amkv7heFbwwiU9FQ/viewform?usp=sf_link">
          Reportar un problema con la aplicación.
        </a>
      </>
    </Router>
  );
}

export default App;
