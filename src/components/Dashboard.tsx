import React, { useState } from "react";
import {
  ActionTypes,
  CHANGE_LINK,
  REMOVE_LINK,
  ADD_LINK,
} from "../store/types";
import { changeLink, removeLink, addLink } from "../store/actions";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useReducerMiddleware } from "./utils";
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

const GET_DEFAULT_SETTINGS = gql`
  query {
    isClosed
    meetLinks
  }
`;

const Dashboard = () => {
  const { loading: loadingDefaults, data: defaults } = useQuery(
    GET_DEFAULT_SETTINGS
  );
  const [closeExam] = useMutation(CLOSE_EXAM, {
    onCompleted: (data) =>
      alert(`Exam is now ${data.closeExam.isClosed ? "closed" : "open"}`),
  });
  if (loadingDefaults) return <p>Loading...</p>;
  return (
    <>
      <h1>Settings</h1>
      <CloseExamToggle isClosed={defaults.isClosed} handleToggle={closeExam} />
      <MeetLinksForm links={defaults.meetLinks} />
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

interface LinksProps {
  links: string[];
}

const MeetLinksForm = (props: LinksProps) => {
  const [updateServerLinks, { loading: updateLinksLoading }] = useMutation(
    UPDATE_LINKS,
    {
      onCompleted: () => setUpdateLinksSuccess(true),
    }
  );
  const initialState = props.links;
  const reducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
      case CHANGE_LINK:
        return [
          ...state.slice(0, action.payload.index),
          action.payload.value,
          ...state.slice(action.payload.index + 1),
        ];
      case REMOVE_LINK:
        return [
          ...state.slice(0, action.payload.index),
          ...state.slice(action.payload.index + 1),
        ];
      case ADD_LINK:
        return [...state, action.payload];
      default:
        return state;
    }
  };
  const middleware = [
    () => (next: any) => (action: ActionTypes) => {
      setShowUnsavedChanges(true);
      setUpdateLinksSuccess(false);
      next(action);
    },
  ];
  const [links, dispatch] = useReducerMiddleware(
    reducer,
    initialState,
    middleware
  );
  const [updateLinksSuccess, setUpdateLinksSuccess] = useState(false);
  const [showUnsavedChanges, setShowUnsavedChanges] = useState(false);

  const handleChange = (value: string, index: number) =>
    dispatch(changeLink(value, index));

  const handleRemove = (index: number) => {
    dispatch(removeLink(index));
  };
  const handleAdd = (value: string) => {
    dispatch(addLink(value));
  };
  const handleSave = () => {
    updateServerLinks({ variables: { links: links } });
    setShowUnsavedChanges(false);
  };
  return (
    <>
      <h4>Oral Exam Links:</h4>
      <form>
        <ol>
          {links.map((link: string, index: number) => (
            <li key={index}>
              <input
                type="text"
                value={link}
                onChange={(e) => handleChange(e.target.value, index)}
              />
              <Button variant="secondary" onClick={() => handleRemove(index)}>
                Remove Link
              </Button>
            </li>
          ))}
        </ol>
        <Button variant="secondary" onClick={() => handleAdd("")}>
          Add Link
        </Button>
        <Button variant="secondary" onClick={handleSave}>
          Save Links
        </Button>
        {updateLinksLoading ? (
          <Alert color="success">Updating links...</Alert>
        ) : updateLinksSuccess ? (
          <Alert color="success">Links updated!</Alert>
        ) : null}
        {showUnsavedChanges ? (
          <Alert>Some changes haven't been saved.</Alert>
        ) : null}
      </form>
    </>
  );
};

export default Dashboard;
