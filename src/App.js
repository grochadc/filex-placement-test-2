import React, {useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import  { VisibleSection, VisibleResult, VisibleRouter, VisiblePersonalForm } from "./visibleComponents";
import { Show } from "./components/Router";

import store from "./store";
import db from './db'

function checkFinished() {
  let state = store.getState();
  if (state.finished) {
    console.log("Posting results to db");
    db
      .ref(`applicants/${state.code}`)
      .set({ ...state.info, applicantCode: state.code, level: state.level });
    db.ref('meetLinksCounter').once('value').then(snapshot => {
      console.log('Current link counter', snapshot.val());
      db.ref('meetLinksCounter').set( snapshot.val() <= 4 ? snapshot.val() + 1 : 0)
    }).catch(console.log)
  }
}

// eslint-disable-next-line
const unsubscribe = store.subscribe(checkFinished);

function App() {
  useEffect(() => {
    console.log('Mounted App');
    db.ref('meetLinksCounter').once('value').then(snapshot => store.dispatch({ type: 'SET_MEET_LINK_COUNTER', payload: snapshot.val()} )).catch(console.log);
  }, [])
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
