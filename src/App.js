import React from "react";
import {createStore} from 'redux';
import {connect} from 'react-redux';
import Section from "./components/Section"
import Result from "./components/Result"
import PersonalForm from "./components/PersonalForm"

import { Router, Show } from "./components/Router"
import Jumbotron from 'react-bootstrap/Jumbotron';

import 'bootstrap/dist/css/bootstrap.min.css';


const mapStateToPropsResult = state => {
  return {code: state.code}
}

const VisibleResult = connect(mapStateToPropsResult)(Result);

const VisibleRouter = connect(state => { return {route: state.route}})(Router);

const mapDispatchToPropsPersonal = dispatch => {
  return {
    handleSubmit: (values, route) => {
      dispatch({type: 'route', payload:'test'});
      dispatch({type: 'info', payload:values});
    }
  }
}
const VisiblePersonalForm = connect(state => {return {none: 0}}, mapDispatchToPropsPersonal)(PersonalForm);


const generateCode = (level) => {
  let str = Math.random().toString(36).substring(7);
  return str.substr(0, 3) + level + str.substr(3)
}

const mapDispatchToPropsSection = dispatch => {
  return {
    handleGiveUp: () => dispatch({ type: 'route', payload: 'result' }),
    nextLevel: () => dispatch({type: 'ADVANCE_LEVEL'}),
    setCode: level =>  dispatch({type: 'code', payload:'yes2code'})
  }
}

const mapStateToPropsSection = state => {
  return {currentSection: state.level}
}

const VisibleSection = connect(mapStateToPropsSection, mapDispatchToPropsSection)(Section);

function App() {
  return (<div>

    <VisibleRouter>
      <Show route='personal'>
        <Jumbotron><h1>Datos Personales</h1></Jumbotron>
        <VisiblePersonalForm />
      </Show>
      <Show route='test'>
        <VisibleSection />
      </Show>
      <Show route='result'>
        <VisibleResult />
      </Show>
    </VisibleRouter>
  </div>)
}

export default App;
