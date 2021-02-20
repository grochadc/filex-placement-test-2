import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import { useTypedSelector } from "../store/reducers";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SAVE_RESULTS_DB } from "../queries";
import { Error, Loading } from "./utils/components";

const Result = () => {
  const history = useHistory();
  const { level, course } = useSelector((state: any) => state.system);
  const [saveResultsDB, { data, error, loading }] = useMutation(
    SAVE_RESULTS_DB
  );

  let info = useTypedSelector((state) => state.applicant);
  useEffect(() => {
    if (info.codigo) {
      console.log("An applicant was found, posting to db");
      saveResultsDB({
        variables: {
          code: info.codigo,
          nombre: info.nombre,
          apellido_paterno: info.apellido_paterno,
          apellido_materno: info.apellido_materno,
          genero: info.genero,
          ciclo: info.ciclo,
          carrera: info.carrera,
          telefono: info.telefono,
          email: info.email,
          externo: info.externo,
          reubicacion: info.reubicacion,
          nivel_escrito: info.nivel_escrito,
          curso: info.curso,
        },
      });
    } else {
      console.log("No applicant found, redirecting to home");
      history.push("/");
    }
  }, [info, saveResultsDB, history]);
  const meetLink = data && data.saveWrittenResults.meetLink;

  if (loading) return <Loading />;
  if (error) return <Error>{JSON.stringify(error)}</Error>;
  return (
    <Container>
      <h2>Examen de Ubicación FILEX</h2>
      <p>Tu examen se envio correctamente.</p>
      {level > 2 ? (
        <div>
          <p>
            Haz click en el enlace para continuar con tu Ubicación:{" "}
            {course === "fr" ? (
              <a href="https://meet.google.com/kib-wbvn-doa">
                {"https://meet.google.com/kib-wbvn-doa"}
              </a>
            ) : (
              <a href={meetLink}>{meetLink}</a>
            )}
          </p>
          <p>
            (Probablemente tendras que esperar unos minutos a que te den acceso.
            Te pedimos paciencia porfavor.)
          </p>
        </div>
      ) : (
        <p>Has terminado tu proceso de ubicación.</p>
      )}
    </Container>
  );
};

export default Result;
