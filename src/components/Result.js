import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/col";
import Container from "react-bootstrap/Container";

const Result = ({ code, currentLink, level, dbError, externo }) => {
  const [copied, setCopied] = useState(false);
  return (
    <Container>
      <h2>Nivel Filex: {level}</h2>
      {!dbError ? <p>Tu examen se envio correctamente</p> : dbError}
      {externo && (
        <Form>
          <Form.Row>
            <Form.Label>Guarda este codigo para tu inscripcion: </Form.Label>
            <Col>
              <Form.Control type="text" size="sm" value={code} />
            </Col>
            <Col>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  setCopied(true);
                }}
              >
                Copiar
              </Button>
            </Col>
          </Form.Row>
        </Form>
      )}
      {copied && <p>Copiado!</p>}
      {level > 1 && (
        <p>
          Examen Oral: <a href={currentLink}>{currentLink}</a>
        </p>
      )}
    </Container>
  );
};

export default Result;
