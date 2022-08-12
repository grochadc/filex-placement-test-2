import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";

type ResultProps = {
  level: number;
  meetLink: string;
};
const Result = (props: ResultProps) => {
  return (
    <Container>
      <h2>Examen de Ubicación FILEX</h2>
      <p>Tu examen se envio correctamente.</p>
      {props.level > 2 ? (
        <div>
          <p>
            Haz click en el enlace para continuar con tu Ubicación:{" "}
            <a href={props.meetLink}>{props.meetLink}</a>
          </p>
          <p>
            (Probablemente tendras que esperar unos minutos a que te den acceso.
            Te pedimos paciencia porfavor.)
          </p>
        </div>
      ) : (
        <>
          <p>Has terminado tu proceso de ubicación.</p>
          <p>Quedaste en nivel {props.level}.</p>
          <p>Nos vemos en las fechas de registro.</p>
        </>
      )}
    </Container>
  );
};

export default Result;
