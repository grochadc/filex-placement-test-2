import React, { useState } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
const CloseExamToggle = (props: {
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
        <ToggleButton value={"false"} checked={false} variant="secondary">
          Open
        </ToggleButton>
        <ToggleButton value={"true"} checked={true} variant="secondary">
          Close
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default CloseExamToggle;
