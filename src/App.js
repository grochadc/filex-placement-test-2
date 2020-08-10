import React from "react";
import { connect } from "react-redux";
import Section from "./components/Section";
import Result from "./components/Result";
import PersonalForm from "./components/PersonalForm";

import { Router, Show } from "./components/Router";
import Jumbotron from "react-bootstrap/Jumbotron";

import "bootstrap/dist/css/bootstrap.min.css";

const VisibleResult = connect(state => {
  return { code: state.code };
})(Result);

const VisibleRouter = connect(state => {
  return { route: state.route };
})(Router);

const mapDispatchToPropsPersonal = dispatch => {
  return {
    handleSubmit: (values, route) => {
      dispatch({ type: "route", payload: "test" });
      dispatch({ type: "info", payload: values });
    }
  };
};
const VisiblePersonalForm = connect(
  state => {
    return { none: 0 };
  },
  mapDispatchToPropsPersonal
)(PersonalForm);

const mapDispatchToPropsSection = dispatch => {
  return {
    handleGiveUp: () => dispatch({ type: "route", payload: "result" }),
    nextLevel: () => dispatch({ type: "ADVANCE_LEVEL" })
  };
};

const mapStateToPropsSection = state => {
  return { currentSection: state.level };
};

const VisibleSection = connect(
  mapStateToPropsSection,
  mapDispatchToPropsSection
)(Section);

function App() {
  return (
    <div>
      <VisibleRouter>
        <Show route="personal">
          <Jumbotron>
            <h1>Datos Personales</h1>
          </Jumbotron>
          <VisiblePersonalForm />
        </Show>
        <Show route="test">
          <VisibleSection />
        </Show>
        <Show route="result">
          <VisibleResult />
        </Show>
      </VisibleRouter>
    </div>
  );
}

export default App;
