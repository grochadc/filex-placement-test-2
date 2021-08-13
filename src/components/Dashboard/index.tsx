import React from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Loading, Error } from "../utils/components";

import _CloseExamToggle from "./CloseExamToggle";
import _MeetLinksForm from "./MeetLinksForm";

export const CloseExamToggle = _CloseExamToggle;
export const MeetLinksForm = _MeetLinksForm;

export const GET_DEFAULT_SETTINGS = gql`
  query {
    isClosed
    meetLinks {
      id
      teacher
      link
      active
    }
  }
`;

export const CLOSE_EXAM = gql`
  mutation {
    closeExam {
      isClosed
    }
  }
`;

export const Dashboard = () => {
  const {
    loading: loadingDefaults,
    data: defaults,
    error: errorDefaults,
    refetch: refecthDefaults,
  } = useQuery(GET_DEFAULT_SETTINGS);
  const [closeExam] = useMutation(CLOSE_EXAM, {
    onCompleted: (data) =>
      alert(`Exam is now ${data.closeExam.isClosed ? "closed" : "open"}`),
  });
  if (loadingDefaults) return <Loading />;
  if (errorDefaults) return <Error>{JSON.stringify(errorDefaults)}</Error>;
  return (
    <>
      <h1>Settings</h1>
      <CloseExamToggle isClosed={defaults.isClosed} handleToggle={closeExam} />
      <MeetLinksForm
        links={defaults.meetLinks}
        refetch={() => {
          console.log("refectchingDefaults");
          refecthDefaults();
        }}
      />
    </>
  );
};

export default Dashboard;
