import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Result = ({ code }) => {
  const [showAlert, setShowAlert] = useState(false);
  return (
    <div>
      <h2>Nivel Filex: {code.charAt(3)}</h2>
      Tu codigo para inscribirte es:<br />
      <Form>
        <Form.Control type="text" value={code} />{" "}
        <Button
          onClick={() => {
            navigator.clipboard.writeText(code);
            setShowAlert(true);
          }}
        >
          Copiar Codigo
        </Button>{" "}
        {showAlert ? "Copiado!" : null}{" "}
      </Form>
    </div>
  );
};

export default Result;
