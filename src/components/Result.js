import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

import db from "../db";
import { getNextItem } from "../lib";

const Result = ({ code, level, dbError, externo }) => {
  const [currentLink, setCurrentLink] = useState("");
  useEffect(() => {
    (async () => {
      try {
        console.log("Getting link");
        const { current, all } = (await db
          .ref("/meetLinks")
          .once("value")).val();
        const nextLinkFromDB = getNextItem(all, current);
        console.log("Next link ", nextLinkFromDB);
        setCurrentLink(current);
        db.ref("/meetLinks/current").set(nextLinkFromDB);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  return (
    <Container>
      <h2>Examen de Ubicación FILEX</h2>
      {!dbError ? <p>Tu examen se envio correctamente.</p> : dbError}
      {level > 1 && (
        <div>
          <p>
            Haz click en el enlace para continuar con tu Ubicación:{" "}
            <a href={currentLink}>{currentLink}</a>
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
