import React from "react";
import Alert from "react-bootstrap/Alert";

type ResultPageProps = {
  id?: string;
  meetLink?: string;
  level: number;
};
const ResultPage = (props: ResultPageProps) => {
  return (
    <div>
      <Alert variant="primary">Tu examen escrito se envio correctamente</Alert>
      {props.level > 2 ? (
        <div>
          <Alert variant="warning">
            Pero todavia no terminas tu proceso de ubicacion!
          </Alert>
          <p>Haz click en el enlace para continuar a tu examen oral:</p>
          <p>
            <a href={props.meetLink}>{props.meetLink}</a>
          </p>
          <p>
            (Probablemente tendras que esperar unos minutos a que te den acceso.
            Te pedimos paciencia porfavor.)
          </p>
        </div>
      ) : (
        <>
          <Alert variant="success">Terminaste tu examen de ubicacion!</Alert>
          <p>Quedaste en nivel {props.level}.</p>
          <p>Nos vemos en las fechas de registro.</p>
        </>
      )}
    </div>
  );
};

export default ResultPage;
