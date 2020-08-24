import React from "react";
import Container from "react-bootstrap/Container";

const Result = ({ code, currentLink, level, dbError, externo }) => {
  return (
    <Container>
      <h2>Examen de Ubicación FILEX</h2>
      {!dbError ? <p>Tu examen se envio correctamente.</p> : dbError}
      {level > 1 && (
        <p>
          Haz click en el enlace para continuar con tu examen oral:{" "}
          <a href={currentLink}>{currentLink}</a>
        </p>
      )}
    </Container>
  );
};

export default Result;
