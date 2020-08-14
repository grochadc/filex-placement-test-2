import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Result = ({ code, currentLink}) => {
  const [showAlert, setShowAlert] = useState(false);
  return (
    <div>
      <h2>Nivel Filex: {code.charAt(3)}</h2>
      Tu codigo para inscribirte es:<br />
      <Form>
        <Form.Control type="text" defaultValue={code} />{" "}
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
      <p>Examen Oral: <a href={currentLink}>{currentLink}</a></p>
    </div>
  );
};

export default Result;
