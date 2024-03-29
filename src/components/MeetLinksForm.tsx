import React, {useState} from 'react';
import { useReducerMiddleware, Action, StoreAPI } from "../components/utils";
import { getOddItem, generateId } from "../utils";
//import { CHANGE_LINK, REMOVE_LINK, ADD_LINK } from "../store/types";
import { changeLink, removeLink, addLink } from "../store/actions";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

type MeetLink = {
    id: string;
    teacher: string;
    link: string;
    active: boolean;
  };
type LinksProps = {
    course: string;
    links: MeetLink[];
    refetch: any;
    updateLink: (link: MeetLink) => void;
    removeLink: (link: MeetLink) => void;
  };
  const MeetLinksForm = (props: LinksProps) => {
    const initialState = props.links;
    const reducer = (state = initialState, action: Action) => {
      switch (action.type) {
        case 'CHANGE_LINK':
          return [
            ...state.slice(0, action.payload.index),
            {
              ...state[action.payload.index],
              [action.payload.key]: action.payload.value,
            },
            ...state.slice(action.payload.index + 1),
          ];
        case 'REMOVE_LINK':
          return [
            ...state.slice(0, action.payload.index),
            ...state.slice(action.payload.index + 1),
          ];
        case 'ADD_LINK':
          return [...state, action.payload];
        default:
          return state;
      }
    };
    const middleware = [
      (store: StoreAPI) => (next: (action: Action) => any) => (
        action: Action
      ) => {
        if (action.type !== 'REMOVE_LINK') {
          setShowUnsavedChanges(true);
          setUpdateLinksSuccess(false);
        }
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
  
    const handleChange = (
      key: string,
      value: string | boolean,
      index: number
    ) => {
      dispatch(changeLink(key, value, index));
    };

    const [updateLinksLoading, setUpdateLinksLoading] = useState(false);
  
    const handleRemove = (index: number, link: MeetLink) => {
      props.removeLink(link);
      dispatch(removeLink(index));
    };
    const handleAdd = (value: MeetLink) => {
      dispatch(addLink(value));
    };
    const handleSave = (links: MeetLink[]) => {
      const link = getOddItem(props.links, links);
      props.updateLink(link);
      setShowUnsavedChanges(false);
      props.refetch();
    };
  
    return (
      <Container>
        <h2>Oral Exam Links ({props.course}):</h2>
        <Row>
          <Col>
            <h3>Teacher</h3>
          </Col>
          <Col>
            <h3>Link</h3>
          </Col>
          <Col>
            <h3>Active</h3>
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
                  <Col>
                    <Form.Control
                      type="checkbox"
                      name="active"
                      checked={meetLink.active}
                      onChange={({ target }) =>
                        handleChange(target.name, !meetLink.active, index)
                      }
                    />
                  </Col>
                  <Button
                    variant="secondary"
                    onClick={() => handleRemove(index, meetLink)}
                  >
                    Remove Link
                  </Button>
                </Row>
              </Form>
            </li>
          ))}
        </ol>
        <Button
          variant="secondary"
          onClick={() =>
            handleAdd({ id: generateId(), teacher: "", link: "", active: false })
          }
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

  export default MeetLinksForm;