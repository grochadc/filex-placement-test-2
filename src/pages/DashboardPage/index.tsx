import React from "react";
import { CloseExamToggle, HomePageMessage } from "../../components/Dashboard";
import MeetLinksForm from "../../components/MeetLinksForm";
import { Loading } from "../../components/utils/components";
import { gql } from "@apollo/client";
import {
  useDefaultSettingsQuery,
  useUpdateSingleLinkMutation,
  useRemoveSingleLinkMutation,
  useCloseExamMutation,
  useUpdateHomePageMessageMutation,
} from "../../generated/grapqhl";
import styled from "styled-components";
import Jumbotron from "react-bootstrap/Jumbotron";

export const DashboardPageQuery = gql`
  query DefaultSettings {
    placementHomePageMessage {
      active
      message
    }
    isClosed
    meetLinks {
      id
      teacher
      link
      active
    }
  }
`;

export const CloseExamMutation = gql`
  mutation CloseExam {
    closeExam {
      isClosed
    }
  }
`;

export const UpdateSingleLinkMutation = gql`
  mutation updateSingleLink($link: MeetLinkInputWithID!) {
    setMeetLink(link: $link)
  }
`;

export const RemoveSingleLinkMutation = gql`
  mutation removeSingleLink($link: MeetLinkInputWithID!) {
    removeMeetLink(link: $link)
  }
`;

export const UpdateHomePageMessageMutation = gql`
  mutation UpdateHomePageMessage($input: PlacementHomePageMessageInput!) {
    setPlacementHomePageMessage(input: $input)
  }
`;

const Container = styled.div``;

function DashboardPage() {
  const { data, loading, error } = useDefaultSettingsQuery();
  const [closeExam] = useCloseExamMutation({
    onCompleted: () => alert("Exam toggled"),
  });
  const [updateSingleLink] = useUpdateSingleLinkMutation();
  const [removeSingleLink] = useRemoveSingleLinkMutation();
  const [updateHomePagMessage] = useUpdateHomePageMessageMutation({
    onCompleted: () => alert("Message saved!"),
  });

  const refecthDefaults = () => console.log("refetch defaults called");
  const handleLinkUpdate = (link: any) =>
    updateSingleLink({ variables: { link } });
  const handleLinkRemove = (link: any) =>
    removeSingleLink({ variables: { link } });
  const handleHomePageMessage = (input: {
    active: boolean;
    message: string;
  }) => {
    console.log("handleHomePageMessage", input);
    updateHomePagMessage({ variables: { input } });
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <Container>
      <Jumbotron>
        <h1>Dashboard</h1>
      </Jumbotron>
      <section>
        <div>
          <CloseExamToggle
            isClosed={data ? data.isClosed : true}
            handleToggle={closeExam}
          />
        </div>
      </section>
      <section>
        <HomePageMessage
          active={data?.placementHomePageMessage.active || false}
          message={data?.placementHomePageMessage.message || ""}
          onSubmit={handleHomePageMessage}
        />
      </section>
      <div>
        <MeetLinksForm
          updateLink={handleLinkUpdate}
          removeLink={handleLinkRemove}
          course="English"
          links={
            data
              ? data.meetLinks
              : [{ id: "id", teacher: "teacher", link: "link", active: false }]
          }
          refetch={refecthDefaults}
        />
      </div>
    </Container>
  );
}

export default DashboardPage;
