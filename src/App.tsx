import React, { useState } from "react";
import Dashboard from "./pages/DashboardPage";
import Section from "./pages/SectionPage";
import Result from "./pages/ResultPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import ResultsList from "./components/Dashboard/TestResults";
import { Error } from "./components/utils/components";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import { gql } from "@apollo/client";
import { usePostResultsMutation } from "./generated/grapqhl";

const initialApplicant = {
  codigo: "",
  nombre: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  genero: "M",
  ciclo: "",
  carrera: "Elige una opcion...",
  telefono: "",
  email: "",
  institucionalEmail: "",
  curso: "",
  externo: false,
  reubicacion: false,
  nivelEscrito: "",
};

export const PostResultsMutation = gql`
  mutation PostResults(
    $codigo: String!
    $nombre: String!
    $apellidoPaterno: String!
    $apellidoMaterno: String!
    $genero: String!
    $ciclo: String!
    $carrera: String!
    $telefono: String!
    $email: String!
    $institucionalEmail: String
    $externo: Boolean!
    $reubicacion: Boolean!
    $nivelEscrito: Int!
    $curso: String!
  ) {
    saveWrittenResults(
      input: {
        codigo: $codigo
        nombre: $nombre
        apellidoPaterno: $apellidoPaterno
        apellidoMaterno: $apellidoMaterno
        genero: $genero
        ciclo: $ciclo
        carrera: $carrera
        telefono: $telefono
        email: $email
        institucionalEmail: $institucionalEmail
        externo: $externo
        reubicacion: $reubicacion
        nivelEscrito: $nivelEscrito
        curso: $curso
      }
    ) {
      id
      meetLink
    }
  }
`;

const App: React.FC = () => {
  const routerNavigate = useNavigate();
  const [postResults, { data: mutationResponse, error }] =
    usePostResultsMutation({
      onCompleted: () => console.log("Completed post results"),
    });
  const [applicant, setApplicant] = useState(initialApplicant);
  const [currentLevel, setCurrentLevel] = useState(1);

  const handleFinishExam = () => {
    console.log("finishing exam", applicant);
    postResults({ variables: { ...applicant, nivelEscrito: currentLevel } });
    routerNavigate("/result");
  };
  if (error)
    return (
      <>
        Error from App: <Error e={error} />
      </>
    );
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header title="Exámen de Ubicación" />
            <HomePage
              onSubmitApplicantInformation={(applicant) => {
                setApplicant({ ...applicant, nivelEscrito: "" });
                routerNavigate("/test");
              }}
            />
          </>
        }
      />
      <Route
        path="/test"
        element={
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
        }
      />
      <Route
        path="/result"
        element={
          <Result
            level={currentLevel}
            meetLink={
              mutationResponse?.saveWrittenResults.meetLink
                ? mutationResponse?.saveWrittenResults.meetLink
                : ""
            }
          />
        }
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/dashboard/results"
        element={
          <ResultsList reloadPage={() => window.location.reload() } />
        }
      />
    </Routes>
  );
};

export default App;
