import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Result from "./components/Result";
import Section from "./components/Section";
import PersonalForm from "./components/PersonalForm";
import Dashboard from "./components/Dashboard";
import { Header } from "./components/componentUtils";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { LOG_OUT } from "./queries";
import { useDispatch } from "react-redux";
import { setRoute } from "./store/actions";
import { useTypedSelector } from "./store/reducers";
import { RootState } from "./store/types";

function updateDocumentTitle() {
  let currentTitle = document.title;
  if (window.location.hostname === "localhost") {
    document.title = `LOCAL ${currentTitle}`;
  }
}

function App() {
  const [logOut] = useLazyQuery(LOG_OUT);
  const dispatch = useDispatch();
  let isDoingExam = useTypedSelector(
    (state: RootState) => state.system.isDoingExam
  );
  useEffect(() => {
    updateDocumentTitle();
    window.addEventListener("beforeunload", () => {
      if (isDoingExam) logOut();
    });
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
