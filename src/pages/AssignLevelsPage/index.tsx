import React from "react";
import {
  useGetTestResultsQuery,
  useGetTestResultsLazyQuery,
  useSaveFinalResultsMutation,
  Filter,
} from "../../generated/grapqhl";
import { gql } from "@apollo/client";
import { Link } from "react-router-dom";

import TestResultsComponent from "../../components/Dashboard/TestResultsTable";
import { Loading } from "../../components/utils/components";

export const TestResultsQuery = gql`
  query getTestResults($filter: Filter) {
    testResults(filter: $filter) {
      id
      codigo
      nombre
      apellidoPaterno
      apellidoMaterno
      genero
      ciclo
      carrera
      telefono
      email
      institutionalEmail
      curso
      externo
      reubicacion
      generated_id
      meetLink
      nivelEscrito
      nivelOral
      nivelFinal
    }
  }
`;

export const SaveFinalLevelsMutation = gql`
  mutation saveFinalResults($id: ID!, $nivelOral: Int!, $nivelFinal: Int!) {
    saveOralResults(
      input: { id: $id, nivelOral: $nivelOral, nivelFinal: $nivelFinal }
    )
  }
`;

export default function AssignLevelsPage() {
  const {
    data: initialResultsData,
    error,
    loading,
  } = useGetTestResultsQuery({
    variables: { filter: Filter.Nonassigned },
  });

  const [fetchAssignedResults, { data: appendResultsData }] =
    useGetTestResultsLazyQuery({
      variables: { filter: Filter.Assigned },
      onError: (err) => console.error(err),
    });

  const [mutate] = useSaveFinalResultsMutation({
    onCompleted: (data) => {
      alert(`Mutation response ${data.saveOralResults}`);
      window.location.reload();
    },
    onError: (err) => alert(`There was an error ${JSON.stringify(error)}`),
  });
  if (loading) return <Loading />;
  return (
    <>
      <Link to="/dashboard">Back to Dashboard</Link>
      <TestResultsComponent
        reloadPage={() => window.location.reload()}
        //@ts-ignore
        initialData={initialResultsData?.testResults}
        //@ts-ignore
        appendData={appendResultsData?.testResults}
        fetchDataToAppend={fetchAssignedResults}
        submitEntry={(id, nivelOral, nivelFinal) =>
          mutate({ variables: { id, nivelOral, nivelFinal } })
        }
      />
    </>
  );
}
