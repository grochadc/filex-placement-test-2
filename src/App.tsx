import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Result from "./components/Result";
import Section from "./components/Section";
import PersonalForm from "./components/PersonalForm";
import Dashboard from "./components/Dashboard";
import RouterView from "./components/Router";

import { useDispatch } from "react-redux";
import { useTypedSelector } from "./store/reducers";
import { setCurrentLink, setRoute } from "./store/actions";
import { gql, useMutation } from "@apollo/client";

const SAVE_RESULTS_DB = gql`
  mutation Results(
    $code: String!
    $nombre: String!
    $apellido_paterno: String!
    $apellido_materno: String
    $genero: String!
    $ciclo: String
    $carrera: String
    $telefono: String!
    $email: String!
    $externo: Boolean!
    $reubicacion: Boolean!
    $nivel_escrito: Int!
    $curso: String!
  ) {
    saveWrittenResults(
      input: {
        codigo: $code
        nombre: $nombre
        apellido_paterno: $apellido_paterno
        apellido_materno: $apellido_materno
        genero: $genero
        ciclo: $ciclo
        carrera: $carrera
        telefono: $telefono
        email: $email
        externo: $externo
        reubicacion: $reubicacion
        nivel_escrito: $nivel_escrito
        curso: $curso
      }
    ) {
      status
      message
      id
      meetLink
    }
  }
`;

function App() {
  const dispatch = useDispatch();
  const [saveResultsDB, { data }] = useMutation(SAVE_RESULTS_DB);
  data && dispatch(setCurrentLink(data.saveWrittenResults.meetLink));
  data && console.log("data", data);
  let info = useTypedSelector((state) => state.applicant);

  const handleGiveup = () => {
    saveResultsDB({
      variables: {
        code: info.codigo,
        nombre: info.nombre,
        apellido_paterno: info.apellido_paterno,
        apellido_materno: info.apellido_materno,
        genero: info.genero,
        ciclo: info.ciclo,
        carrera: info.carrera,
        telefono: info.telefono,
        email: info.email,
        externo: info.externo,
        reubicacion: info.reubicacion,
        nivel_escrito: info.nivel_escrito,
        curso: info.curso,
      },
    });
    dispatch(setRoute("result"));
  };
  return (
    <div>
      <RouterView route="personal">
        <Jumbotron>
          <Container>
            <h1>EXAMEN DE UBICACION FILEX</h1>
            <h3>Datos Personales</h3>
          </Container>
        </Jumbotron>
        <PersonalForm />
      </RouterView>
      <RouterView route="test">
        <Section handleGiveup={handleGiveup} />
      </RouterView>
      <RouterView route="result">
        <Result />
      </RouterView>
      <RouterView route="dashboard">
        <Dashboard />
      </RouterView>
    </div>
  );
}

export default App;
