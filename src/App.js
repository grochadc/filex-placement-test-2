import React from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Section from "./components/Section";
import Result from "./components/Result";
import PersonalForm from "./components/PersonalForm";
import { Router, Show } from "./components/Router";

import store from "./store";
import firebase from "firebase/app";
import "firebase/database";

import DB_CONFIG from "./config";

const app = firebase.initializeApp(DB_CONFIG);

function checkFinished() {
  let state = store.getState();
  if (state.finished) {
    console.log("Posting results to db");
    app
      .database()
      .ref(`applicants/${state.code}`)
      .set({ ...state.info, applicantCode: state.code, level: state.level });
  }
}

// eslint-disable-next-line
const unsubscribe = store.subscribe(checkFinished);

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
    handleGiveUp: () => dispatch({ type: "FINISH_EXAM" }),
    nextLevel: pass =>
      pass
        ? dispatch({ type: "ADVANCE_LEVEL" })
        : dispatch({ type: "FINISH_EXAM" })
  };
};

const mapStateToPropsSection = state => {
  return { currentSection: state.level, applicantCode: state.code };
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
