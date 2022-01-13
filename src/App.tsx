import React, { useState } from "react";
import Dashboard from "./pages/DashboardPage";
import Section from "./pages/SectionPage";
import Result from "./pages/ResultPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import SimpleRouter, { Route } from "./components/SimpleRouter";

import { gql } from "@apollo/client";
import { usePostResultsMutation } from "./generated/grapqhl";

const initialApplicant = {
  codigo: "",
  nombre: "",
  apellido_paterno: "",
  apellido_materno: "",
  genero: "M",
  ciclo: "",
  carrera: "Elige una opcion...",
  telefono: "",
  email: "",
  institucionalEmail: "",
  curso: "",
  externo: false,
  reubicacion: false,
  nivel_escrito: "",
};

export const PostResultsMutation = gql`
  mutation PostResults(
    $codigo: String!
    $nombre: String!
    $apellido_paterno: String!
    $apellido_materno: String!
    $genero: String!
    $ciclo: String!
    $carrera: String!
    $telefono: String!
    $email: String!
    $institucionalEmail: String
    $externo: Boolean!
    $reubicacion: Boolean!
    $nivel_escrito: Int!
    $curso: String!
  ) {
    saveWrittenResults(
      input: {
        codigo: $codigo
        nombre: $nombre
        apellido_paterno: $apellido_paterno
        apellido_materno: $apellido_materno
        genero: $genero
        ciclo: $ciclo
        carrera: $carrera
        telefono: $telefono
        email: $email
        institucionalEmail: $institucionalEmail
        externo: $externo
        reubicacion: $reubicacion
        nivel_escrito: $nivel_escrito
        curso: $curso
      }
    ) {
      id
      meetLink
    }
  }
`;

const App: React.FC = () => {
  const [postResults, { data: mutationResponse, error }] =
    usePostResultsMutation({
      onCompleted: () => console.log("Completed post results"),
    });
  const defaultPath =
    window.location.pathname === "/dashboard" ? "dashboard" : "home";
  const [currentPath, setCurrentPath] = useState(defaultPath);
  const [applicant, setApplicant] = useState(initialApplicant);
  const [currentLevel, setCurrentLevel] = useState(1);

  const handleFinishExam = () => {
    postResults({ variables: { ...applicant, nivel_escrito: currentLevel } });
    setCurrentPath("result");
  };
  if (error) return <>{JSON.stringify(error)}</>;
  return (
    <>
      <SimpleRouter currentPath={currentPath}>
        <Route path="home">
          <Header title="DATOS PERSONALES" />
          <HomePage
            onSubmitApplicantInformation={(applicant) => {
              setApplicant({ ...applicant, nivel_escrito: "" });
              setCurrentPath("test");
            }}
          />
        </Route>
        <Route path="test">
          <Section
            currentLevel={currentLevel}
            course={applicant.curso}
            onNextLevel={(pass) => {
              if (pass) {
                setCurrentLevel(currentLevel + 1);
              } else {
                handleFinishExam();
              }
            }}
            onFinishExam={handleFinishExam}
          />
        </Route>
        <Route path="result">
          <Result
            level={currentLevel}
            //@ts-ignore
            meetLink={mutationResponse?.saveWrittenResults.meetLink}
          />
        </Route>
        <Route path="dashboard">
          <Header title="DASHBOARD" />
          <Dashboard />
        </Route>
      </SimpleRouter>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSd3Q1mA6cdkxBQxgbuo4rc6O2dkZXaBK_amkv7heFbwwiU9FQ/viewform?usp=sf_link">
        Reportar un problema con la aplicación.
      </a>
    </>
  );
};

export default App;
