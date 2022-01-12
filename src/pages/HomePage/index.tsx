import React from "react";
import { gql } from "@apollo/client";
import { Loading } from "../../components/utils/components";
import { useHomePageQuery } from "../../generated/grapqhl";
import Alert from "react-bootstrap/Alert";

import PersonalForm, { FormikSchema } from "../../components/PersonalForm";

export const HomePageQuery = gql`
  query HomePage {
    carreras {
      name
    }
    placementHomePageMessage {
      active
      message
    }
    isClosed
  }
`;

type HomePageProps = {
  onSubmitApplicantInformation: (applicantInformation: FormikSchema) => void;
};

const HomePage = (props: HomePageProps) => {
  const { data, loading, error } = useHomePageQuery();
  if (loading) return <Loading />;
  if (error) return <>{JSON.stringify(error)}</>;
  return (
    <div>
      {data?.isClosed ? (
        <Alert variant="primary">
          En estos momentos no estamos aplicando examenes. Por favor vuelve mas
          tarde.
        </Alert>
      ) : null}
      {data?.placementHomePageMessage.active ? (
        <Alert variant="warning">{data.placementHomePageMessage.message}</Alert>
      ) : null}
      <PersonalForm
        onSubmit={props.onSubmitApplicantInformation}
        disabled={data?.isClosed || false}
        carreras={
          data ? data.carreras.map((carrera) => carrera.name) : ["null"]
        }
      />
      <Alert variant="warning" style={{ margin: "1em" }}>
        <small>
          Es probable que al finalizar el examen escrito debas hacer un examen
          oral.
        </small>
      </Alert>
    </div>
  );
};

export default HomePage;
