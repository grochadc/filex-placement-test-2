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
import { SET_DB_ERROR, SET_CURRENT_LINK } from "./redux/actionTypes";
import db from "./db";
import { getNextItem } from "./lib";

// eslint-disable-next-line
const unsubscribe = store.subscribe(checkFinished);

async function checkFinished() {
  let state = store.getState();
  if (state.finished) {
    postResults(state);
  }
}

function postResults(state) {
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
}

function App() {
  useEffect(() => {
    (async () => {
      try {
        console.log("Getting link");
        const { current, all } = (await db
          .ref("/meetLinks")
          .once("value")).val();
        const nextLinkFromDB = getNextItem(all, current);
        console.log("Next link ", nextLinkFromDB);
        store.dispatch({ type: SET_CURRENT_LINK, payload: current });
        db.ref("/meetLinks/current").set(nextLinkFromDB);
      } catch (err) {
        console.error(err);
      }
    })();
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
