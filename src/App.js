import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import {
  VisibleSection,
  VisibleResult,
  VisibleRouter,
  VisiblePersonalForm
} from "./visibleComponents";
import { Show } from "./components/Router";

import store from "./store";
import { SET_DB_ERROR, SET_MEET_LINK_COUNTER } from "./redux/actionTypes";
import db from "./db";

function checkFinished() {
  let state = store.getState();
  if (state.finished) {
    console.log("Posting results to db");
    db.ref(
      `applicants/${state.info.external ? state.info.phone : state.info.code}`
    )
      .set({
        ...state.info,
        course: state.info.curso,
        applicantCode: state.code,
        level: state.level,
        meetLink: state.level > 1 ? state.currentLink.substr(24) : ""
      })
      .then(() => console.log("Posted to db successfully"))
      .catch(e => store.dispatch({ type: SET_DB_ERROR, payload: e.code }));
    db.ref("meetLinksCounter")
      .once("value")
      .then(snapshot => {
        db.ref("meetLinksCounter").set(
          snapshot.val() <= 3 ? snapshot.val() + 1 : 0
        );
      })
      .catch(console.log);
  }
}

// eslint-disable-next-line
const unsubscribe = store.subscribe(checkFinished);

function getRand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function App() {
  console.log("App");
  useEffect(() => {
    db.ref("meetLinksCounter")
      .once("value")
      .then(snapshot => {
        console.log("Setting state counter as", snapshot.val());
        store.dispatch({
          type: SET_MEET_LINK_COUNTER,
          payload: getRand(0, 5)
        });
      })
      .catch(console.log);
  }, []);
  return (
    <div>
      <VisibleRouter>
        <Show route="personal">
          <Jumbotron>
            <Container>
              <h1>EXAMEN DE UBICACION FILEX</h1>
              <h3>Datos Personales</h3>
            </Container>
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
