import React, { useState } from "react";
import { CHANGE_LINK, REMOVE_LINK, ADD_LINK } from "../store/types";
import { changeLink, removeLink, addLink } from "../store/actions";
import { useMutation, useQuery } from "@apollo/client";
import { useReducerMiddleware, Action, StoreAPI } from "./utils";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Loading, Error } from "./utils/components";
import { GET_DEFAULT_SETTINGS, CLOSE_EXAM, UPDATE_LINKS } from "../queries";

export const Dashboard = () => {
  const {
    loading: loadingDefaults,
    data: defaults,
    error: errorDefaults,
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
      <MeetLinksForm links={defaults.meetLinks} />
    </>
  );
};

export const CloseExamToggle = (props: {
  isClosed: boolean;
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
        <ToggleButton value={false} checked={false} variant="secondary">
          Open
        </ToggleButton>
        <ToggleButton value={true} checked={true} variant="secondary">
          Close
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

interface LinksProps {
  links: MeetLink[];
}

type MeetLink = {
  teacher: string;
  link: string;
};

export const MeetLinksForm = (props: LinksProps) => {
  const [
    updateServerLinks,
    { loading: updateLinksLoading, error: updateLinksError },
  ] = useMutation(UPDATE_LINKS, {
    onCompleted: () => setUpdateLinksSuccess(true),
  });
  const initialState = props.links;
  const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
      case CHANGE_LINK:
        return [
          ...state.slice(0, action.payload.index),
          {
            ...state[action.payload.index],
            [action.payload.key]: action.payload.value,
          },
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
    (store: StoreAPI) => (next: (action: Action) => any) => (
      action: Action
    ) => {
      setShowUnsavedChanges(true);
      setUpdateLinksSuccess(false);
      return next(action);
    },
  ];
  const [links, dispatch] = useReducerMiddleware(
    reducer,
    initialState,
    middleware
  );
  const [updateLinksSuccess, setUpdateLinksSuccess] = useState(false);
  const [showUnsavedChanges, setShowUnsavedChanges] = useState(false);

  const handleChange = (key: string, value: string, index: number) => {
    dispatch(changeLink(key, value, index));
  };

  const handleRemove = (index: number) => {
    dispatch(removeLink(index));
  };
  const handleAdd = (value: MeetLink) => {
    dispatch(addLink(value));
  };
  const handleSave = (links: MeetLink[]) => {
    updateServerLinks({ variables: { links } });
    setShowUnsavedChanges(false);
  };

  if (updateLinksError) <Error>{JSON.stringify(updateLinksError)}</Error>;
  return (
    <Container>
      <h2>Oral Exam Links:</h2>
      <Row>
        <Col>
          <h3>Teacher</h3>
        </Col>
        <Col>
          <h3>Link</h3>
        </Col>
      </Row>
      <ol>
        {links.map((meetLink: MeetLink, index: number) => (
          <li key={index}>
            <Form>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    name="teacher"
                    value={meetLink.teacher}
                    onChange={({ target }) =>
                      handleChange(target.name, target.value, index)
                    }
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    name="link"
                    value={meetLink.link}
                    onChange={({ target }) =>
                      handleChange(target.name, target.value, index)
                    }
                  />
                </Col>
                <Button variant="secondary" onClick={() => handleRemove(index)}>
                  Remove Link
                </Button>
              </Row>
            </Form>
          </li>
        ))}
      </ol>
      <Button
        variant="secondary"
        onClick={() => handleAdd({ teacher: "", link: "" })}
      >
        Add Link
      </Button>
      <Button variant="secondary" onClick={() => handleSave(links)}>
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
    </Container>
  );
};

export default Dashboard;
