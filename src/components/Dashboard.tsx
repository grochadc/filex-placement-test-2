import React, { useState, useReducer } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const CLOSE_EXAM = gql`
  mutation {
    closeExam {
      isClosed
    }
  }
`;

const IS_EXAM_CLOSED = gql`
  query {
    isClosed
    meetLinks
  }
`;

const Dashboard = () => {
  const queryResult = useQuery(IS_EXAM_CLOSED);
  const [closeExam] = useMutation(CLOSE_EXAM, {
    onCompleted: (data) =>
      alert(`Exam is now ${data.closeExam.isClosed ? "closed" : "open"}`),
  });
  if (queryResult.loading) return <p>Loading...</p>;
  return (
    <>
      <h1>Settings</h1>
      <CloseExamToggle
        isClosed={queryResult.data.isClosed}
        handleToggle={closeExam}
      />
      <MeetLinksForm links={queryResult.data.meetLinks} />
    </>
  );
};

const CloseExamToggle = (props: {
  isClosed: any;
  handleToggle: () => void;
}) => {
  const [isClosed, setIsClosed] = useState(props.isClosed);
  const handleChange = () => {
    props.handleToggle();
    setIsClosed(!isClosed);
  };
  return (
    <>
      <h4>Exam:</h4>
      <ToggleButtonGroup
        type="radio"
        name="toggle"
        value={isClosed}
        onChange={handleChange}
      >
        <ToggleButton value={false} variant="secondary">
          Open
        </ToggleButton>
        <ToggleButton value={true} variant="secondary">
          Close
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

const UPDATE_LINKS = gql`
  mutation updateLinks($links: [String]!) {
    setMeetLinks(links: $links)
  }
`;

interface LinksState {
  links: string[];
}

interface LinksAction {
  type: string;
  payload: {
    value: string;
    index: number;
  };
}

const MeetLinksForm = (props: LinksState) => {
  const inititalState: LinksState = {
    links: props.links,
  };
  const reducer = (state: LinksState, action: LinksAction) => {
    switch (action.type) {
      case "CHANGE_LINK":
        return {
          links: [
            ...state.links.slice(0, action.payload.index),
            action.payload.value,
            ...state.links.slice(action.payload.index + 1),
          ],
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, inititalState);
  const [updateLinksSuccess, setUpdateLinksSuccess] = useState(false);
  const handleChange = (value: string, index: number) =>
    dispatch({ type: "CHANGE_LINK", payload: { value, index } });
  const [updateServerLinks, { loading: updateLinksLoading }] = useMutation(
    UPDATE_LINKS,
    {
      onCompleted: () => setUpdateLinksSuccess(true),
    }
  );
  const handleClick = () => {
    updateServerLinks({ variables: { links: state.links } });
  };
  return (
    <>
      <h4>Oral Exam Links:</h4>
      <form>
        <ol>
          {state.links.map((link: string, index: number) => (
            <li key={index}>
              <input
                type="text"
                value={link}
                onChange={(e) => handleChange(e.target.value, index)}
              />
            </li>
          ))}
        </ol>
        <Button variant="secondary" onClick={handleClick}>
          Save Links
        </Button>
        {updateLinksLoading ? (
          <Alert color="success">Updating links...</Alert>
        ) : updateLinksSuccess ? (
          <Alert color="success">Links updated!</Alert>
        ) : null}
      </form>
    </>
  );
};

export default Dashboard;
