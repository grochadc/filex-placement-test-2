import React from "react";
import Container from "react-bootstrap/Container";

const Result = ({ code, level, currentLink, dbError, externo, curso }) => {
  console.log("Curso from stat", curso);
  return (
    <Container>
      <h2>Examen de Ubicación FILEX</h2>
      {!dbError ? <p>Tu examen se envio correctamente.</p> : dbError}
      {level > 1 && (
        <div>
          <p>
            Haz click en el enlace para continuar con tu Ubicación:{" "}
            {curso === "french" ? (
              <a href="https://meet.google.com/kib-wbvn-doa">
                {"https://meet.google.com/kib-wbvn-doa"}
              </a>
            ) : (
              <a href={currentLink}>{currentLink}</a>
            )}
          </p>
          <p>
            (Probablemente tendras que esperar unos minutos a que te den acceso.
            Te pedimos paciencia porfavor.)
          </p>
        </div>
      )}
    </Container>
  );
};

export default Result;
