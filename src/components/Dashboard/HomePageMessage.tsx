import React, { useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

type HomePageMessageProps = {
  onSubmit: (data: { active: boolean; message: string }) => void;
  message: string;
  active: boolean;
};
const HomePageMessage = (props: HomePageMessageProps) => {
  const [message, setMessage] = useState(props.message);
  const [active, setActive] = useState(props.active);
  const handleSubmit = () => props.onSubmit({ active, message });
  return (
    <Container>
      <h2>Mensaje:</h2>
      <textarea onChange={(e) => setMessage(e.target.value)}>
        {message}
      </textarea>
      <span>
        <label htmlFor="homePageMessageActiveCheckbox">Active:</label>
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          id="homePageMessageActiveCheckbox"
          style={{ marginLeft: "0.7em" }}
        />
      </span>
      <Button onClick={handleSubmit}>Guardar</Button>
    </Container>
  );
};

export default HomePageMessage;
